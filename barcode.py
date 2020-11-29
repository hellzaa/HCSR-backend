import json
info= {
    "PharmacyID": 12,
    "MedID": 3,
    "TradeName": 'Moxal',
    "GenericName": 'Aluminium Hydroxide suspension',
    "Dosage": '500mg',
    "Description": 'Gastric Reflex calming medication'
  }
json_data=json.dumps(info)
print(json_data)
