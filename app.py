from flask import Flask, render_template, request, redirect
from newspaper import Article
from newsapi import NewsApiClient
import pandas as pd
import joblib


app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/aboutus')
def about_us():
    return render_template('about_us.html')

# Predic For Input User (Home)
@app.route('/result', methods=['POST', 'GET'])
def result():
    if request.method == 'POST':
        url = request.form.get("url")
        if url:
            title = getTitle(url)
            text = getText(url)
            image = getImage(url)
            data = title + ' ' + text
            result = checkFakeNews(data)
            if result:
                return render_template('result.html', article_title = title, text = text, image = image, url = url, value='REAL')
            else:
                return render_template('result.html', article_title = title, text = text,image = image, url = url, value='FAKE')
        else:
            return render_template('home.html', error = 'This form cannot be empty')
    else:
        return redirect('/')


loaded_model = joblib.load('model.sav')
tfidf_vectorizer = joblib.load('vectorizer.sav')

def checkFakeNews(datas):
    data = [datas]
    tfidf_test = tfidf_vectorizer.transform(data)
    result = loaded_model.predict(tfidf_test)

    if result == 'real':
        return True
    else :
        return False

def getTitle(url):
    article=Article(url)
    article.download()
    article.parse()
    title = article.title
    return title

def getText(url):
    article=Article(url)
    article.download()
    article.parse()
    text = article.text
    return text

def getImage(url):
    article=Article(url)
    article.download()
    article.parse()
    image = article.top_image
    return image


# Predic For News API (News Feed)
newsapi=NewsApiClient(api_key='e1155f7ec34e4af690db87f96fec058a')

loaded_model=joblib.load('model.sav')
tfidf_vectorizer=joblib.load('vectorizer.sav')

def predict_fake(title,text):

    data={"Unnamed: 0":["0000"], "title":[title], "text":[text], "label":["FAKE/REAL"]}
    frame=pd.DataFrame(data, columns= ["Unnamed: 0", "title","text","label"])
    frame.drop("label",axis=1)
    tfidf_test=tfidf_vectorizer.transform(frame['text'])
    pred = loaded_model.predict(tfidf_test)
    return pred[0]

def predict(url):

    try:
        article=Article(url)
        article.download()
        article.parse()

        article.nlp()

        return [str(article.title), predict_fake(str(article.title),str(article.text)),str(article.summary),article.top_image]
    except ValueError:
        return("Something went wrong")
    finally:
        return  [str(article.title), predict_fake(str(article.title), str(article.text)),  str(article.summary),article.top_image]


def get_headlines():
    final=[]
    top_headlines= newsapi.get_top_headlines(language='en',page_size=6)

    for i in top_headlines['articles']:
        k=predict(i['url'])
        date =i['publishedAt']
        final.append([i['url'], i['title'], i['description'], i['source']['name'], i['urlToImage'], k[1].upper(),date[0:10]])
    return final

@app.route('/newsfeed')
def news_feed():
    headlines=get_headlines()
    return render_template('news_feed.html',headlines=headlines)

if __name__== '__main__':
    app.run(debug=True)
