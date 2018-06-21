import csv

def main():
    entries = {}
    entryAmounts = {}
    entryList = []
    csvList = []
    with open ('csAlumni.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        csvList = list(reader)
    
    for line in csvList:
        entries[line[15]] = line[17]
        if line[15] not in entryAmounts:
            entryAmounts[line[15]] = 1
        else:
            entryAmounts[line[15]] = entryAmounts[line[15]] + 1
    for key, value in entries.items():
        entryList.append({
            "employer": key, "industry": value, "alumni": entryAmounts[key]
        })
    with open("output.txt", "w") as textFile:
        print("{", file=textFile)
        for entry in entryList :
            print(entry, ",", file=textFile)
        print("}", file=textFile)
        textFile.close()

if __name__ == "__main__":
    main()