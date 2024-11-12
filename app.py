from flask import Flask, jsonify, request
from flask_cors import CORS
from sentiment_analyzer import SentimentAnalyzer
from news_fetcher import NewsFetcher

app = Flask(__name__)
CORS(app)

sentiment_analyzer = SentimentAnalyzer()
news_fetcher = NewsFetcher()

@app.route('/api/stock-sentiment', methods=['GET'])
def get_stock_sentiment():
    symbol = request.args.get('symbol', '')
    if not symbol:
        return jsonify({"error": "No stock symbol provided"}), 400
    
    news = news_fetcher.get_news(symbol)
    if not news:
        return jsonify({"error": "No news found for the given stock symbol"}), 404
    
    analyzed_news = sentiment_analyzer.analyze_news(news)
    
    overall_sentiment = calculate_overall_sentiment(analyzed_news)
    
    return jsonify({
        "symbol": symbol,
        "overall_sentiment": overall_sentiment,
        "analyzed_news": analyzed_news
    })

def calculate_overall_sentiment(analyzed_news):
    sentiment_scores = {'negative': 0, 'neutral': 0, 'positive': 0}
    for item in analyzed_news:
        for sentiment_type in ['title_sentiment', 'summary_sentiment']:
            for label, score in item[sentiment_type]['scores'].items():
                sentiment_scores[label] += score
    
    total_score = sum(sentiment_scores.values())
    normalized_scores = {k: v / total_score for k, v in sentiment_scores.items()}
    
    return max(normalized_scores, key=normalized_scores.get)

if __name__ == '__main__':
    app.run(debug=True)
