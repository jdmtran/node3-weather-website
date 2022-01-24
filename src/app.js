import express from 'express';
import hbs from 'hbs';  // needed for hbs partials
import path from 'path';
import { fileURLToPath } from 'url';
import { geocode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for Express config
const publicdir = path.join(__dirname, "../public");
const viewsdir = path.join(__dirname, '../templates/views');  // custom hbs views directory
const partialsdir = path.join(__dirname, "../templates/partials");  // partials directory

// console.log(__dirname);
// console.log(__filename);
// console.log(publicdir);


let app = express();

// Setup handlebars engine and views and partials locations
app.set('view engine', 'hbs'); // set up handlebars for express
app.set('views', viewsdir); // to customize views directory instead of default 'views' dir
hbs.registerPartials(partialsdir);  // tell handlebars where partisl directory is


// Setup static directory to serve for express
app.use(express.static(publicdir));  // configure express to serve the static directory
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/cssbs', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/cssfa', express.static(path.join(__dirname, '../node_modules/font-awesome/css')));
app.use('/jsbs', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));


// Setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'James'
    });    //index.hbs in views folder
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'James'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'James',
        helpMsg: 'This weather app does blah blah blah blah...'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'Missing address'
        })
    }

    geocode(address, ({ errormsg } = {}, { place, latitude, longitude } = {}) => {
        if (errormsg) {
            return res.send({
                error: errormsg
            });
        } else {
            forecast(latitude, longitude, ({ errormsg } = {}, forecast) => {
                if (errormsg) {
                    return res.send({
                        error: errormsg
                    });
                } else {
                    return res.send({
                        forecast,
                        place,
                        address
                    });
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'James',
        errorMsg: 'Help article not found.'
    });
})

// All others result in 404, must be last
app.get('*', (req, res) => {
    res.render('404', {
        name: 'James',
        errorMsg: 'Page not found.'
    });
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>');
// })

// app.get ('/help', (req, res) => {
//     res.send ({help: 'Help menu'});
// })

// app.get ('/about', (req, res)=> {
//     res.send ('<h1 style="color: green">About this app<h1>');
// })


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});

