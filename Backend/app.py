"""A script for handling the backend with Flask."""

# Internal imports
from main import get_data

# External imports
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def use_data():
    try:
        data_counties, data_country = get_data()
        print("Flask server is running!")
        return jsonify({"Županije": data_counties, "Država": data_country})
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
