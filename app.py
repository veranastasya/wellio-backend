from flask import Flask, render_template, request, redirect, url_for
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Set the folder to store uploaded images relative to the static folder.
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Global dictionary to store client information (for prototype purposes)
clients = {}
client_counter = 1

@app.route('/')
def home():
    return redirect(url_for('list_clients'))

# View all clients
@app.route('/clients')
def list_clients():
    return render_template('clients.html', clients=clients)

# Add a new client
@app.route('/clients/add', methods=['GET', 'POST'])
def add_client():
    global client_counter
    if request.method == 'POST':
        name = request.form.get('name')
        age = request.form.get('age')
        height = request.form.get('height')
        weight = request.form.get('weight')
        activity = request.form.get('activity')
        desired_weight = request.form.get('desired_weight')
        
        # Create a new client entry with an empty meal list
        client_id = client_counter
        clients[client_id] = {
            'name': name,
            'age': age,
            'height': height,
            'weight': weight,
            'activity': activity,
            'desired_weight': desired_weight,
            'meals': []
        }
        client_counter += 1
        return redirect(url_for('list_clients'))
    return render_template('add_client.html')

# Client detail page: shows client info and allows meal upload
@app.route('/clients/<int:client_id>', methods=['GET', 'POST'])
def client_detail(client_id):
    client = clients.get(client_id)
    if not client:
        return "Client not found", 404
    
    if request.method == 'POST':
        # Handle meal image upload
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file:
            # Use secure_filename to sanitize the file name
            filename = secure_filename(f"client{client_id}_{file.filename}")
            # Save the file in the configured upload folder
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            # Store the relative path from the static folder, e.g., "uploads/filename.jpg"
            relative_path = os.path.join('uploads', filename).replace('\\', '/')
            
            # Hardcoded macronutrient analysis
            analysis = {
                'Protein': '25g',
                'Carbohydrates': '30g',
                'Fats': '10g'
            }
            # Updated recommendation text
            recommendation = (
                "Overall, the client made a great choice with this meal. However, since they've already had breakfast "
                "and lunch, it may be challenging to reach the daily protein target. This meal is a bit low in protein, "
                "so it might be beneficial to boost protein intake for dinner. Would you like me to send a specific recommendation "
                "to help increase their protein intake? In the meantime, consider adding more protein-rich foods and fiber-rich "
                "vegetables to support muscle building and overall nutrition."
            )
            
            meal_info = {
                'image': relative_path,  # relative path (e.g., 'uploads/filename.jpg')
                'analysis': analysis,
                'recommendation': recommendation
            }
            client['meals'].append(meal_info)
            return redirect(url_for('client_detail', client_id=client_id))
    
    return render_template('client_detail.html', client=client, client_id=client_id)

if __name__ == '__main__':
    # Create the uploads folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
