import random
import string

def main():
    letter_replacements = {}
    all_replacements = set()
    
    print("Choose 5 letters (lowercase only) and assign 3 replacement characters to each:")
    
    for _ in range(5):
        while True:
            letter = input("Enter a lowercase letter: ")
            if len(letter) == 1 and letter.islower() and letter not in letter_replacements:
                break
            print("Please enter a single lowercase letter that hasn't been used yet.")
        
        letter_replacements[letter] = []
        
        for i in range(3):
            while True:
                replacement = input(f"Enter replacement #{i+1} for '{letter}': ")
                if len(replacement) == 1 and replacement not in all_replacements:
                    letter_replacements[letter].append(replacement)
                    all_replacements.add(replacement)
                    break
                print("Please enter a single character that hasn't been used as a replacement yet.")
    
    # Verilen kod parçasını kullanıyoruz
    passwords = []
    for _ in range(5):
        password = ''.join(random.choices(string.ascii_lowercase, k=15))
        passwords.append(password)
    
    print("\nOriginal Passwords:")
    for password in passwords:
        print(password)
    
    processed_passwords = []
    for password in passwords:
        processed = ""
        for char in password:
            if char in letter_replacements:
                processed += random.choice(letter_replacements[char])
            else:
                processed += char
        processed_passwords.append(processed)
    
    categorized_passwords = {
        "strong": [],
        "weak": []
    }
    
    for password in processed_passwords:
        replacement_count = sum(1 for char in password if char in all_replacements)
        if replacement_count > 4:
            categorized_passwords["strong"].append(password)
        else:
            categorized_passwords["weak"].append(password)
    
    print("\nGenerated Passwords:")
    
    print("\nSTRONG PASSWORDS:")
    for password in categorized_passwords["strong"]:
        print(password)
    
    print("\nWEAK PASSWORDS:")
    for password in categorized_passwords["weak"]:
        print(password)

if __name__ == "__main__":
    main() 