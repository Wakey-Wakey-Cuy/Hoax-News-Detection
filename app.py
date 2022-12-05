from flask import Flask, render_template, request, redirect, jsonify
from news import getArticlePredict, getSpecifArticle, getSpecifArticle

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/aboutus')
def about_us():
    return render_template('about_us.html')

@app.route('/', methods=['POST', 'GET'])
def result():
    if request.method == 'POST':
        url = request.form.get("url")
        if url:
            news = getArticlePredict(url)

            text = news['text']
            print(len(text))
            if(len(text) < 1000):
                return render_template('home.html',value='INVALID',url=url)
            else:
                return render_template('result.html', url = url, article_title = news['title'], text = news['text'], image = news['image'], value=news['pred_result'], score=f" {news['pred_score']}%")
        else:
            return render_template('home.html', error = 'This form cannot be empty')
    else:
        return redirect('/')

@app.route('/newsfeed')
def news_feed():
    articles = [None]*9
    return render_template('news_feed.html', articles=articles)


@app.route('/getSpecificNews')
def getSpecificNews():
    currentReal = request.args.get('cr', type = int)
    currentFake = request.args.get('cf', type = int)
    index = request.args.get('idx',  type = int)
    result = getSpecifArticle(currentReal,currentFake,index,maxReal=5,maxFake=4)
    return jsonify(article = result[0], currentReal = result[1], currentFake = result[2], index = result[3])

if __name__== '__main__':
    app.run(debug=True)