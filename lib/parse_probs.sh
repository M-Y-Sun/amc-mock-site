#!/bin/bash

# USAGE:
# ./parse_probs.sh src dest_dir

if [ $# -ne 2 ]; then
    printf "\033[1;31mfatal error:\033[0m invalid number of parameters\n"
fi

inp="$1"

# echo "Filtering out solution links..."

# html_nosol=$(awk '{$1=$1};1' <"$1" | tr '\n' ' ' | sed 's/<a href[^>]*>Solution<\/a >//g')
# echo "$html_nosol" >tmp2.html

# echo "$html_nosol" | grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_7\".*?/>\s?</p>" >tmp3.html
# echo "$html_nosol" | grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_7\".*?/>\s?</p>\s?<p>\s?\s?</p>" >tmp3.html
# echo "$html_nosol" | grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_7\".*?/>\s?</p>\s?<a" >tmp3.html
# echo "$html_nosol" | grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_7\".*?/>\s?</p>" >tmp3.html

# grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_7\".*?/>\s?</p>" <"$1" >tmp3.html

#/> </p><p><a
# grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_7\".*?/>\s?</p>\s?<p>\s?<a" <"$inp" >tmp3.html

# exit

echo "Grepping problems into files..."

mkdir "./problems/$2"

for i in {1..25}; do
    echo "Processing problem ${i}..."
    # echo "$html_nosol" | grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_${i}\".*?/>\s?</p>" >"./problems/${2}/p${i}.html"
    # echo "$html_nosol" | grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_${i}\".*?/>\s?</p>\s?\s?<\p>" >"./problems/${2}/p${i}.html"
    grep -Eo "<h2>\s?<span class=\"mw-headline\" id=\"Problem_${i}\".*?/>\s?</p>\s?<p>\s?<a" <"$inp" >"./problems/${2}/p${i}.html"
done

echo "Done"
