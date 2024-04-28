"""This is a main script. It is used for exctracting the data about the counties in Croatia."""

# External imports
import pandas as pd
import sqlite3


def create_db():
    """A function used for creating a database."""

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")
    cursor = conn.cursor()

    # Creates database structure
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS podaci (
                    id INTEGER PRIMARY KEY,
                    ime_zupanije TEXT,
                    sjediste TEXT,
                    povrsina REAL,
                    gustoca REAL,
                    o_zupaniji TEXT,
                    godina_1857 INTEGER,
                    godina_1900 INTEGER,
                    godina_1931 INTEGER,
                    godina_1961 INTEGER,
                    godina_1991 INTEGER,
                    godina_2001 INTEGER,
                    godina_2011 INTEGER,
                    godina_2021 INTEGER
        )
    ''')

    # Closes the connection
    conn.close()


def excel_to_db():
    """A function for extracting the data from the Excel sheet storing it to the database."""

    # Reads Excel and converts it to the DataFrame
    df = pd.read_excel("../Data/Podaci po zupanijama.xlsx")

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")

    # Puts the data to the database
    df.to_sql("podaci", conn, if_exists="replace", index=False)

    # Closes the connection
    conn.close()


def get_data():
    """A function for getting the data from the database."""

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")
    cursor = conn.cursor()

    # Gets the data from the database
    cursor.execute("SELECT * FROM podaci")
    data = cursor.fetchall()

    keys = ["Naziv županije", "Sjedište županije", "Površina", "Gustoća naseljenosti", "O županiji",
            "1857.", "1900.", "1931.", "1961.", "1991.", "2001.", "2011.", "2021."]
    result = []
    for row in data:
        item = {}
        for i in range(len(keys)):
            item[keys[i]] = row[i]
        result.append(item)

    # Closes the connection
    conn.close()

    return result


if __name__ == "__main__":
    create_db()
    excel_to_db()
