import { Formik, Form, Field } from "formik";
import { useState } from "react";
import './header.css';
import './content.css';
import './article.css';

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return (
    <div>
      <header>
        <Formik
          initialValues={{search: '', cant: 0}}
          onSubmit={async values => {
            //llarmar a api de unsplash
            
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=${values.cant}&query=${values.search}`, 
            { headers:{
              'Authorization': 'Client-ID gFZmebR3Ia2JmiKDUgaS-NNzGlR9b-_0nif5DzelKOY'
            }})

            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" placeholder="Que desea buscar" />
            <Field name="cant" placeholder="Indique cantidad de imagenes" />
            <button type="submit">Buscar</button>
          </Form>

        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(
            photo => <article key={photo.id} onClick={() => open(photo.links.html) } >
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p> 
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
