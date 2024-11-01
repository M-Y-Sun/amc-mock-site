#!/bin/bash

# create files
echo "Creating files..."

# fill files with curl
echo "Fetching files..."
lead='https://artofproblemsolving.com/wiki/index.php/'
mid='_AMC_10'
trail='_Problems'

extract_problem_section() {
    awk '{$1=$1};1' <"$1" | tr '\n' ' ' | grep -Eo '<h2>\s?<span class="mw-headline" id="Problem_1">(.*?)<h2>\s?<span class="mw-headline" id="See_(a|A)lso">' | sed 's/\/\/latex/https:\/\/latex/g'
}

# curl "${lead}2021_Fall_AMC_10A_Problems" >tmp
# extract_problem_section tmp >tmp.html
# ./parse_probs.sh './tmp.html' '2021falla'
#
# exit

curl "${lead}2000${mid}${trail}" >tmp
extract_problem_section tmp >tmp.html
./parse_probs.sh './tmp.html' '2000'

curl "${lead}2001${mid}${trail}" >tmp
extract_problem_section tmp >tmp.html
./parse_probs.sh './tmp.html' '2001'

for i in {0..21}; do
    if ((i == 19)); then
        continue
    fi

    year=$((2002 + i))

    curl "${lead}${year}${mid}A${trail}" >tmp
    extract_problem_section tmp >tmp.html
    ./parse_probs.sh './tmp.html' "${year}a"

    curl "${lead}${year}${mid}B${trail}" >tmp
    extract_problem_section tmp >tmp.html
    ./parse_probs.sh './tmp.html' "${year}b"
done

curl "${lead}2021_Fall_AMC_10A_Problems" >tmp
extract_problem_section tmp >tmp.html
./parse_probs.sh './tmp.html' '2021falla'

curl "${lead}2021_Fall_AMC_10B_Problems" >tmp
extract_problem_section tmp >tmp.html
./parse_probs.sh './tmp.html' '2021fallb'

curl "${lead}2021_Spring_AMC_10A_Problems" >tmp
extract_problem_section tmp >tmp.html
./parse_probs.sh './tmp.html' '2021springa'

curl "${lead}2021_Spring_AMC_10B_Problems" >tmp
extract_problem_section tmp >tmp.html
./parse_probs.sh './tmp.html' '2021springb'

rm tmp tmp.html

echo "DONE"
