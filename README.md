# Make POST to translation service using terminal
curl -X POST http://localhost:8000/translate -d '{"phrase": "Andrei Vorobei"}'
curl -X POST http://localhost:8000/admin/create_phrase -d '{"phrase": "Ksu Belka"}'
curl -X POST http://localhost:8000/admin/delete_phrase -d '{"phrase": "Ksu Belka"}'
curl -X POST http://localhost:8000/admin/update_phrase -d '{"phrase": "Ksu Belka", "language": "2", "translation": "Ксю белка"}'
curl -X GET http://localhost:8000/all_languages
# DB user friendly editor 
https://sqlitebrowser.org/dl/