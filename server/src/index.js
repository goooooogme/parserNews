import {parsePost, getLinks} from './parsePost'
import elems from './config'
import fs from 'fs';
const {dag, ing, che} = elems;




const links = {
    dag: {
        link: 'https://www.riadagestan.ru/news/politics/',
        classLinkPosts: '.b-mid-col__layout li a',
        elems: dag
    },
    che: {
        link: 'https://grozny-inform.ru/news/politic/',
        classLinkPosts: '.partition_news p a',
        elems: che
    },
    ing: {
        link: 'http://magastimes.ru/category/novosti/',
        classLinkPosts: '.td-main-content .item-details a',
        elems: ing
    }
}


function getParser(links) {
    getLinks(links.link, links.classLinkPosts).then(async (data) => {
    const tmp = [];


    for (let i = 0; i < data.length; i++) {
        tmp.push(await parsePost(data[i], links.elems));
    }    

    fs.writeFile("./server/parse.txt", JSON.stringify(tmp), function(error){
            if(error) throw error; // если возникла ошибка
        });
    });
}

getParser(links.ing);







 