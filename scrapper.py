import requests
from bs4 import BeautifulSoup

# Función para buscar el contenido de YourUpload
def buscar_yourupload():
    # Construir la URL
    url = f'https://www3.animeflv.net/ver/{anime_name}-{episode_number}' + '#opcion2'
    
    # Realizar la solicitud GET
    response = requests.get(url)

    # Verifica si la solicitud fue exitosa
    if response.status_code == 200:
    
        # Parsear el contenido de la página con BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Lista para almacenar los enlaces de YourUpload
        yourupload_links = []

        # Buscar en iframes
        iframes = soup.find_all('iframe')
        for iframe in iframes:
            src = iframe.get('src=', '')
            if 'yourupload.com' in src:  # Verificamos si el src contiene yourupload.com
                yourupload_links.append(src)

        # Mostrar resultados
        if yourupload_links:
            for link in yourupload_links:
                print(link)
        else:
            print("No se encontraron enlaces de YourUpload.")
    else:
        print(f"Error al acceder a la página: {response.status_code}")

# Ejemplo de uso
anime_name = 'naruto'  # Cambia esto al anime que desees buscar
episode_number = 220

# Cambia esto al número de episodio que desees buscar

buscar_yourupload()
