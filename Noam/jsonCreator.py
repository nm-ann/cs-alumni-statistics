import csv

def main():
    entries = {}
    entryList = []
    csvList = []
    with open ('csAlumni.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        csvList = list(reader)
    
    for line in csvList:
        entries[line[15]] = line[17]
    for key, value in entries.items():
        entryList.append({
            "employer": key, "industry": value
        })
    with open("output.txt", "w") as textFile:
        print("{", file=textFile)
        for entry in entryList :
            print(entry, ",", file=textFile)
        print("}", file=textFile)
        textFile.close()

if __name__ == "__main__":
    main()