import random
import string

def main():
    letters = ['a', 'e', 'i', 'o', 'u']
    
    possible_replacements = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '?', '/', '<', '>', ',', '.', ';']
    
    selected_replacements = random.sample(possible_replacements, 15)
    
    letter_replacements = {}
    all_replacements = set()
    
    print("Automatically selected letters and their replacements:")
    
    for i, letter in enumerate(letters):
        letter_replacements[letter] = []
        for j in range(3):
            replacement = selected_replacements[i*3 + j]
            letter_replacements[letter].append(replacement)
            all_replacements.add(replacement)
            print(f"Letter '{letter}' - Replacement #{j+1}: {replacement}")
    
    all_passwords = []
    for _ in range(15):
        password = ''.join(random.choices(string.ascii_lowercase, k=15))
        all_passwords.append(password)
    
    all_passwords.sort(key=lambda p: sum(1 for char in p if char in letters))
    
    passwords = all_passwords[:3] + all_passwords[-2:]
    
    print("\nOriginal Passwords:")
    for password in passwords:
        vowel_count = sum(1 for char in password if char in letters)
        print(f"{password} (sesli harf sayısı: {vowel_count})")
    
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
        print(f"  Replacement count: {sum(1 for char in password if char in all_replacements)}")
    
    print("\nWEAK PASSWORDS:")
    if categorized_passwords["weak"]:
        for password in categorized_passwords["weak"]:
            print(password)
            print(f"  Replacement count: {sum(1 for char in password if char in all_replacements)}")
    else:
        print("Hiç zayıf şifre oluşturulamadı. Şifreler genellikle çok fazla sesli harf içeriyor.")

if __name__ == "__main__":
    main() 