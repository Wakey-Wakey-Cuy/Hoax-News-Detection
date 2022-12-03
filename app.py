from flask import Flask, render_template, request, redirect
from newspaper import Article
import joblib


app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/newsfeed')
def news_feed():
    return render_template('news_feed.html')

@app.route('/aboutus')
def about_us():
    return render_template('about_us.html')

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



def checkFakeNews(datas):
    data = [datas]
    loaded_model = joblib.load('model.sav')
    tfidf_vectorizer = joblib.load('vectorizer.sav')

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


if __name__== '__main__':
    app.run(debug=True)
