"""This is a main script. It is used for exctracting the data about Croatia and its counties."""

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
        CREATE TABLE IF NOT EXISTS podaci_zupanije (
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

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS podaci_drzava (
                        id INTEGER PRIMARY KEY,
                        ime_drzave TEXT,
                        povrsina REAL,
                        gustoca REAL,
                        o_drzavi TEXT,
                        povijest TEXT,
                        politicki_ustroj TEXT,
                        drzavni_simboli TEXT,
                        valuta TEXT,
                        jezik TEXT,
                        religija TEXT,
                        klima TEXT,
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
    df_county = pd.read_excel("../Data/Podaci.xlsx", sheet_name="Županije")
    df_croatia = pd.read_excel("../Data/Podaci.xlsx", sheet_name="Država")

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")

    # Puts the data to the database
    df_county.to_sql("podaci_zupanije", conn, if_exists="replace", index=False)
    df_croatia.to_sql("podaci_drzava", conn, if_exists="replace", index=False)

    # Closes the connection
    conn.close()


def get_data():
    """A function for getting the data from the database."""

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")
    cursor = conn.cursor()

    # Gets the counties data from the database
    cursor.execute("SELECT * FROM podaci_zupanije")
    data_counties = cursor.fetchall()

    keys_counties = ["Naziv županije", "Sjedište županije", "Površina", "Gustoća naseljenosti", "O županiji",
                     "1857.", "1900.", "1931.", "1961.", "1991.", "2001.", "2011.", "2021."]
    result_counties = []
    for row in data_counties:
        item = {}
        for i in range(len(keys_counties)):
            item[keys_counties[i]] = row[i]
        result_counties.append(item)

    # Gets the country data from the database
    cursor.execute("SELECT * FROM podaci_drzava")
    data_country = cursor.fetchall()

    keys_country = ["Naziv države", "Površina", "Gustoća naseljenosti", "O državi", "Povijest", "Politički ustroj",
                    "Državni simboli",
                    "Valuta", "Jezik", "Religija", "Klima", "1857.", "1900.", "1931.", "1961.", "1991.", "2001.",
                    "2011.", "2021."]
    result_country = []
    for row in data_country:
        item = {}
        for i in range(len(keys_country)):
            item[keys_country[i]] = row[i]
        result_country.append(item)

    # Closes the connection
    conn.close()

    return result_counties, result_country


if __name__ == "__main__":
    create_db()
    excel_to_db()
