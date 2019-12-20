import unirest from 'unirest'
import cheerio from 'cheerio'
import uuid from 'uuid/v4';





async function parsePost(url, elems) {
    return await new Promise((resolve,reject) => {
        unirest
            .get(url)
            .then(async ({body, error}) => {
                if (error) reject(error);
                const domen = url.slice(0,url.indexOf('.ru')+3);
                const $ = cheerio.load(body);
                const title = $(elems.title).text().trim();
                let image = $(elems.image).attr('src');
                if (!(image === undefined))   
                    image = image.indexOf('.ru') < 0 ? domen + image : image;
                else image = "https://via.placeholder.com/150x100"
                const description = $(elems.text).text().trim();
                const view = $(elems.view).text().trim();
                let regions = '';
                switch (domen) {
                    case 'https://www.riadagestan.ru':
                        regions = 'DAG';
                        break;
                    case 'https://grozny-inform.ru':
                        regions = 'CHE';
                        break;
                    case 'http://magastimes.ru':
                        regions = 'ING';
                        break;
                }
                let id = uuid();
                const post = {
                    title,
                    image,
                    description,
                    view,
                    regions,
                    id
                }

                resolve(post)
            });
    })  

}

async function getLinks(url, classLinks, count=5) {
    return await new Promise((resolve, reject) => {
        unirest
        .get(url)
        .then(({body}) => {
            const $ = cheerio.load(body);
            const tmp = [];
            const domen = url.slice(0,url.indexOf('.ru')+3);
            let links = $(classLinks);
            
            
            for (let i = 0; i < count; i++) {
                const lst = links[i].attribs.href.indexOf('.ru') < 0 ? domen + links[i].attribs.href : links[i].attribs.href;
                tmp.push(lst);
            }
                
            resolve(tmp)
        });
        
    }) 
}


module.exports = {parsePost, getLinks};