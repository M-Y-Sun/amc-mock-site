#!/bin/bash

# create files
echo "Creating files..."
touch ./solutions/2000.txt ./solutions/2001.txt

for i in {0..21}; do
    if [ "$i" == 19 ]; then
        continue
    fi

    year=$((2002 + i))
    touch ./solutions/${year}a.txt ./solutions/${year}b.txt
done

touch ./solutions/2021falla.txt ./solutions/2021springa.txt ./solutions/2021springa.txt ./solutions/2021springb.txt

# fill files with curl
echo "Fetching files..."
lead='https://artofproblemsolving.com/wiki/index.php/'
mid='_AMC_10'
trail='_Answer_Key'
curl "${lead}2000${mid}${trail}" | grep "<li>" >./solutions/2000.txt
curl "${lead}2001${mid}${trail}" | grep "<li>" >./solutions/2001.txt

for i in {0..21}; do
    if ((i == 19)); then
        continue
    fi

    year=$((2002 + i))
    curl "${lead}${year}${mid}A${trail}" | grep "<li>" >"./solutions/${year}a.txt"
    curl "${lead}${year}${mid}B${trail}" | grep "<li>" >"./solutions/${year}b.txt"
done

curl "https://artofproblemsolving.com/wiki/index.php/2021_Fall_AMC_10A_Answer_Key" | grep "<li>" >"./solutions/2021falla.txt"
curl "https://artofproblemsolving.com/wiki/index.php/2021_Fall_AMC_10B_Answer_Key" | grep "<li>" >"./solutions/2021fallb.txt"
curl "https://artofproblemsolving.com/wiki/index.php/2021_AMC_10A_Answer_Key" | grep "<li>" >"./solutions/2021springa.txt"
curl "https://artofproblemsolving.com/wiki/index.php/2021_AMC_10A_Answer_Key" | grep "<li>" >"./solutions/2021springb.txt"

# delete extra html and only keep the letter answer
echo "filtering files"

tmp=$(grep -Eo "[A-E]" "./solutions/2000.txt")
echo "$tmp" | tr '\n' ',' >./solutions/2000.txt

tmp=$(grep -Eo "[A-E]" "./solutions/2001.txt")
echo "$tmp" | tr '\n' ',' >./solutions/2001.txt

for i in $(seq 0 21); do
    if ((i == 19)); then
        continue
    fi

    year=$((2002 + i))

    tmp=$(grep -Eo "[A-E]" "./solutions/${year}a.txt")
    echo "$tmp" | tr '\n' ',' >"./solutions/${year}a.txt"

    tmp=$(grep -Eo "[A-E]" "./solutions/${year}b.txt")
    echo "$tmp" | tr '\n' ',' >"./solutions/${year}b.txt"
done

tmp=$(grep -Eo "[A-E]" "./solutions/2021falla.txt")
echo "$tmp" | tr '\n' ',' >./solutions/2021falla.txt

tmp=$(grep -Eo "[A-E]" "./solutions/2021fallb.txt")
echo "$tmp" | tr '\n' ',' >./solutions/2021fallb.txt

tmp=$(grep -Eo "[A-E]" "./solutions/2021springa.txt")
echo "$tmp" | tr '\n' ',' >./solutions/2021springa.txt

tmp=$(grep -Eo "[A-E]" "./solutions/2021springb.txt")
echo "$tmp" | tr '\n' ',' >./solutions/2021springb.txt

echo "setup complete"
