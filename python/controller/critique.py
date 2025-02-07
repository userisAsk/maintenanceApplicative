import request.request as req

def add_critique(data):
    if (not "attraction_id" in data or not data["attraction_id"]):
        return False
    
    if (not "note" in data or data["note"] is None):
        return False
    
    if (not "texte" in data or data["texte"] == ""):
        return False
    
    if ("id" in data and data["id"]):
        requete = f"UPDATE Critique SET attraction_id={data['attraction_id']}, nom='{data.get('nom', '')}', prenom='{data.get('prenom', '')}', note={data['note']}, texte='{data['texte']}' WHERE id = {data['id']}"
        req.insert_in_db(requete)
        id = data['id']
    else:
        requete = "INSERT INTO Critique (attraction_id, nom, prenom, note, texte) VALUES (?, ?, ?, ?, ?);"
        id = req.insert_in_db(requete, (data["attraction_id"], data.get("nom", ""), data.get("prenom", ""), data["note"], data["texte"]))
    
    return id

def get_critiques_by_attraction(attraction_id):
    if (not attraction_id):
        return False
    
    json = req.select_from_db("SELECT * FROM Critique WHERE attraction_id = ?", (attraction_id,))
    return json

def delete_critique(id):
    if (not id):
        return False
    
    req.delete_from_db("DELETE FROM Critique WHERE id = ?", (id,))
    return True