import docx
import os

def read_docx(file_path):
    doc = docx.Document(file_path)
    fullText = []
    for para in doc.paragraphs:
        fullText.append(para.text)
    return '\n'.join(fullText)

file_path = r'd:\acursor\avyna\Website İçerik Yazıları.docx'
if os.path.exists(file_path):
    content = read_docx(file_path)
    with open('docx_content.txt', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Content written to docx_content.txt")
else:
    print(f"File not found: {file_path}")
