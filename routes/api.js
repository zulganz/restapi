const express = require('express');
const router = express.Router();
const axios = require('axios')
var { fetchJson } = require('../lib/fetcher.js')
const path = require('path');
const { readFileTxt, readFileJson } = require('../lib/function');
const { ytMp4, ytMp3, ytPlay } = require('../lib/youtube');
const { cekKey, limitAdd, isLimit } = require('../database/db');
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');
const { photoOxy } = require('./oxy');
const { Otakudesu, Getdownload } = require('../lib/otakudesu')
const  request  = require('request');
var creatorList = ['Zul'];
var fetch = require('node-fetch');
var fs = require('fs');
 var creator = creatorList[Math.floor(Math.random() * creatorList.length)];
 var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
 _ = require('lodash')
__path = process.cwd();

async function Joox(query) {
    return new Promise((resolve, reject) => {
      const time = Math.floor(new Date() / 1000)
      axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
        .then(({
          data
        }) => {
          let result = []
          let hasil = []
          let promoses = []
          let ids = []
          data.itemlist.forEach(result => {
            ids.push(result.songid)
          });
          for (let i = 0; i < data.itemlist.length; i++) {
            const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
            promoses.push(
              axios.get(get, {
                headers: {
                  Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
                }
              })
              .then(({
                data
              }) => {
                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                hasil.push({
                  lagu: res.msong,
                  album: res.malbum,
                  penyanyi: res.msinger,
                  publish: res.public_time,
                  img: res.imgSrc,
                  mp3: res.mp3Url
                })
  
                axios.get('http://api.joox.com/web-fcgi-bin/web_lyric?musicid=' + ids[i] + '&lang=id&country=id&_=' + time)
                  .then(({
                    data
                  }) => {
                    const lirik = JSON.parse(data.replace('MusicJsonCallback(', '').replace('\n)', '')).lyric
                    const buff = new Buffer.from(lirik, 'base64')
                    const ash = buff.toString('utf-8')
                    result.push({
                      result: ash
                    })
                    Promise.all(promoses).then(() => resolve({status: 200, result: hasil}))
                  }).catch(reject)
              }).catch(reject)
            )
          }
        }).catch(reject)
    })
  }
loghandler = {
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    noemote: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter emot'
  },
      query: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter query'
  },
  nousername: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter username'
},
  notype: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter type'
},
    domain: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter domain'
  },
    nomor: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter nomor'
  },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'mungkin sedang dilakukan perbaikan'
    },
    img: {
      status: false,
      creator: `${creator}`,
      message: 'Silahkan Masukan Url Image'
  },
    nottheme: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter theme'
    },
    noname: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter nama'
    },
    noname2: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter nama2'
    },
    username: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter username'
    },
    mimpi: {
      status: false,
      creator: `${creator}`,
      code: 406,
      message: 'masukan parameter mimpi'
    },
    invalidlink: {
      status: false,
      creator: `${creator}`,
      message: 'error, mungkin link anda tidak valid.'
    },
    }
    const { 
      whois, 
      Tiktok,
      TiktokStalk,
      Github,
      Simi,
      WPUser,
      Emoji,
      KBBI,
      igStory,
      tebakGambar,
      otakuDesuOngoing,
      tiktokDown,
      emojiScraper,
      genPassword 
  } = require("../function/lainya");
    const { 
      igStalk, 
      igDownload 
  } = require("../function/ig");
    const { 
      artiNama, 
      artiMimpi, 
      ramalJodoh, 
      nomorHoki 
  } = require("../function/primbon");
  const { 
    yDonlod, 
    yPlay, 
    ySearch 
} = require("../function/yt");

router.get('/simsimi', async (req, res, next) => {
             const query = req.query.query
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
    if(!query) return res.json(loghandler.query)
       fetch(encodeURI(`https://api.simsimi.net/v1/?text=${query}&lang=id&cf=true`))
        .then(response => response.json())
        .then(data => {
        var data = data;
             res.json({
             	status: `200`,        	
             	result: {
             		query: `${query}`,
             		answer: `${data.messages[0].response}`
             	},
             	Note: `Jangan Di Spam Ya Cok (emote batu)`
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/docs/503.html')
})
})

//make a command that can reset every limit for 24 hours
router.get('/resetlimit', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
      status: 404,
      message: `Input Parameter apikey`
  });
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  const check = await cekKey(apikey);
  if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
  limitAdd(apikey);
  res.json({
    status: `200`,
    message: `limit reset every 24 hours`
  })
})


router.get('/emoji', async(req, res, next) => {
  const emoji = req.query.emo
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  if (!emoji) return res.json(loghandler.noemote)
  emojiScraper(emoji)
  .then(data =>{ res.send(data)})
  .catch(err=>{
  console.log(err)
  res.send('error')
  })
})

router.get('/otakudesuongoing', async(req, res, next) => {
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
      otakuDesuOngoing()
  .then(data =>{ res.send(data)})
  .catch(err=>{
  console.log(err)
  res.send('error')
  })
})

router.get('/tebakgambar', async(req, res, next) => {
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  tebakGambar()
  .then(data =>{ res.send(data)})
  .catch(err=>{
  console.log(err)
  res.send('error')
  })
})

router.get('/ttdl', async(req, res, next) => {
  const url = req.query.url
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  if (!url) return res.json(loghandler.invalidlink)
  tiktokDown(url)
  .then(data =>{ res.send(data)})
  .catch(err=>{
  console.log(err)
  res.send('error')
  })
})
router.get('/kbbi', async(req, res, next) => {
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  const kata = req.query.text || req.query.q;
  if (!kata) return res.json(loghandler.nottext);
  KBBI(kata)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/igstory', async(req, res, next) => {
  const username = req.query.username
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  if (!username) return res.json(loghandler.nousername)
  igStory(username)
  .then(data =>{ res.send(data)})
  .catch(err=>{
  console.log(err)
  res.send('error')
  })
})

router.get('/githubstalk', async(req, res, next) => {
  const user = req.query.username
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  if (!user) return res.json(loghandler.nousername)
  Github(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get('/tiktokdl', async(req, res, next) => {
  const url = req.query.url
  const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
  if (!url) return res.json(loghandler.invalidlink);
  Tiktok(url)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
  router.get('/ytsearch', async(req, res, next) => {
    const query = req.query.query
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
    if(!query) return res.json(loghandler.query)
    ySearch(query)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});
        router.get('/ig/stalk', async(req, res, next) => {
          const username = req.query.username
          const apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        limitAdd(apikey);
          if(!username) return res.json(loghandler.username)
          igStalk(username)
              .then((data) => {
                  res.send(data);
              })
              .catch((err) => {
                  res.send(err);
              });
      });
      router.get('/ig/dl', async(req, res, next) => {
        const url = req.query.url
        const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      limitAdd(apikey);
        if(!url) return res.json(loghandler.invalidlink)
        igDownload(url)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            });
    });

    router.get('/whois', async(req, res, next) => {
      const domain = req.query.domain
      const apikey = req.query.apikey;
      if (apikey === undefined) return res.status(404).send({
          status: 404,
          message: `Input Parameter apikey`
      });
      let limit = await isLimit(apikey);
      if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
      const check = await cekKey(apikey);
      if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    limitAdd(apikey);
      if(!domain) return res.json(loghandler.domain)
      whois(domain)
          .then((data) => {
              res.send(data);
          })
          .catch((err) => {
              res.send(err);
          });
  });

    router.get('/generatepw', async(req, res, next) => {
      const apikey = req.query.apikey;
      if (apikey === undefined) return res.status(404).send({
          status: 404,
          message: `Input Parameter apikey`
      });
      let limit = await isLimit(apikey);
      if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
      const check = await cekKey(apikey);
      if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    limitAdd(apikey);
    genPassword()
          .then((data) => {
              res.send(data);
          })
          .catch((err) => {
              res.send(err);
          });
  });

 router.get('/artinama11', async(req, res, next) => {
 const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  const nama = req.query.nama;
  if(!nama) return res.json(loghandler.noname)
  artiNama(nama)
      .then((data) => {
          res.send(data);
      })
      .catch((error) => {
          res.send(error);
      });
});
router.get('/artinama', async (req, res, next) => {
          nama = req.query.nama
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
        fetch(encodeURI(`https://ariarestapii.herokuapp.com/api/artinama11?nama=${nama}&apikey=aria`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
               status: 200,
               data
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
         router.get('/artimimpi', async (req, res, next) => {
          mimpi = req.query.mimpi
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!mimpi) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter mimpi"})
        fetch(encodeURI(`https://ariarestapii.herokuapp.com/api/artimimpi11?mimpi=${mimpi}&apikey=aria`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
               data
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
router.get('/artimimpi11', async(req, res, next) => {
  const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 let limit = await isLimit(apikey);
 if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
   status: 403,
   message: `apikey ${apikey} not found, please register first!`
});
 const mimpi = req.query.mimpi;
 if(!mimpi) return res.json(loghandler.nomimpi)
 artiMimpi(mimpi)
     .then((data) => {
         res.send(data);
     })
     .catch((error) => {
         res.send(error);
     });
});
router.get('/nomorhoki111111111111111111111', async(req, res, next) => {
  const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 let limit = await isLimit(apikey);
 if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
   status: 403,
   message: `apikey ${apikey} not found, please register first!`
});
 const nomor = req.query.nomor;
 if(!nomor) return res.json(loghandler.nomor)
 nomorHoki(nomor)
     .then((data) => {
         res.send(data);
     })
     .catch((error) => {
         res.send(error);
     });
});
router.get('/jodo1h', async(req, res, next) => {
  const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
 const nama1 = req.query.nama1;
 const nama2 = req.query.nama2;
 if(!nama1) return res.json(loghandler.noname)
 if(!nama2) return res.json(loghandler.noname2)
 ramalJodoh(nama1, nama2)
     .then((data) => {
         res.send(data);
     })
     .catch((error) => {
         res.send(error);
     });
});
router.get('/aesthetic', async (req, res, next) => {
   const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    hem = ''
 link = 'https://source.unsplash.com/random'
         axios.get(link).then(async (result) => {
             hem = result.request.res.responseUrl
             baper = await fetch(hem).then(v => v.buffer())
             res.type('png')
             res.send(baper)
         })
  })
        router.get('/wanted', async (req, res, next) => {
        const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          mim = req.query
          if (!mim.url) return res.json({ status: 404, msg: 'Masukkan Param Url'})
          try {
            canva = await require('canvacord').Canvas.wanted(mim.url)
            res.type('png')
            res.send(canva)
            
          } catch {
            res.json({ status: 404, msg: 'Server Error, Please Report To wa.me/6281215199447'})
          }
        })
        router.get('/google', async (req, res, next) => {
        const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          yt = require('google-it')
        if (!req.query.q) return res.json({ status: false, msg: 'Masukkan Parameter q'})
        ser = await yt({ query: req.query.q})
        res.json({ status: 'success', result: ser})
        })
        router.get('/darkjokes', async (req, res, next) => {
        const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          bdyyyy = await fetch('https://raw.githubusercontent.com/Caliph71/txt/main/darkjokes.txt')
       bdy = await bdyyyy.text()
        splitnix = bdy.split('\n')
              
         randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
         re = await fetch(randomnix).then(v => v.buffer())
         res.type('jpg')
         res.send(re)
})
        router.get('/wasted', async (req, res, next) => {
        const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          mim = req.query
          if (!mim.url) return res.json({ status: 404, msg: 'Masukkan Param Url'})
          try {
            canva = await require('canvacord').Canvas.wasted(mim.url)
            res.type('png')
            res.send(canva)
            
          } catch {
            res.json({ status: 404, msg: 'Server Error, Please Report To wa.me/6281215199447'})
          }
        })
        router.get('/trigger', async (req, res, next) => {
          mim = req.query
        const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          if (!mim.url) return res.json({ status: 404, msg: 'Masukkan Param Url'})
          try {
            canva = await require('canvacord').Canvas.trigger(mim.url)
            res.type('gif')
            res.send(canva)
            
          } catch {
            res.json({ status: 404, msg: 'Server Error'})
          }  
        })
        router.get('/megumin', async (req, res, next) => { 
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
          data = await fetchJson('https://api.waifu.pics/sfw/megumin')
          buff = await fetch(data.url).then(v => v.buffer())
          res.type('png')
          res.send(buff)
          })

          router.get('/husbu', async (req, res, next) => { 
            apikey = req.query.apikey;
            if (apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter apikey`
            });
            let limit = await isLimit(apikey);
            if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
            limitAdd(apikey);
            const check = await cekKey(apikey);
            if (!check) return res.status(403).send({
              status: 403,
              message: `apikey ${apikey} not found, please register first!`
          });
            data = await fetchJson('https://memekgede.herokuapp.com/api/husbuando')
            buff = await fetch(data.image).then(v => v.buffer())
            res.type('png')
            res.send(buff)
            })

            router.get('/waifu', async (req, res, next) => { 
              apikey = req.query.apikey;
              if (apikey === undefined) return res.status(404).send({
                  status: 404,
                  message: `Input Parameter apikey`
              });
              let limit = await isLimit(apikey);
              if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
              limitAdd(apikey);
              const check = await cekKey(apikey);
              if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
              data = await fetchJson('https://api.waifu.pics/sfw/waifu')
              buff = await fetch(data.url).then(v => v.buffer())
              res.type('png')
              res.send(buff)
              })

            router.get('/poke', async (req, res, next) => { 
              apikey = req.query.apikey;
              if (apikey === undefined) return res.status(404).send({
                  status: 404,
                  message: `Input Parameter apikey`
              });
              let limit = await isLimit(apikey);
              if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
              limitAdd(apikey);
              const check = await cekKey(apikey);
              if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
              data = await fetchJson('https://api.waifu.pics/sfw/poke')
              buff = await fetch(data.url).then(v => v.buffer())
              res.type('gif')
              res.send(buff)
              })
  

        router.get('/spamcall', async (req, res, next) => {
       no = req.query.no
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
      if (!no) return res.json({ status : false, creator : `${creator}`, message : "masukin nomernya"})

       fetch(encodeURI(`https://mhankbarbar.herokuapp.com/api/spamcall?no=${no}`))
      .then(response => response.json())
    .then(data => {
    var result = data;
     res.json({
     author: 'zul',
        result
   })
   })
 })
        router.get('/stalker', async (req, res, next) => {
          username = req.query.username
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!username) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter username"})
        
        fetch(encodeURI(`https://mhankbarbar.herokuapp.com/api/stalk?username=${username}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
               result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
          router.get('/quotes', async (req, res, next) => {
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });      
        fetch(encodeURI(`https://ariarestapii.herokuapp.com/api/quotes1?apikey=aria`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
               result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
        router.get('/cersex', async (req, res, next) => {
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        
        fetch(encodeURI(`https://memekgede.herokuapp.com/api/cersex`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
             status: 200,
             result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
        router.get('/samehadaku', async (req, res, next) => {
          q = req.query.q
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter q"})
        
        fetch(encodeURI(`https://memekgede.herokuapp.com/api/samehadaku?q=${q}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
             status: 200,
             result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
        router.get('/kusonime', async (req, res, next) => {
          q = req.query.q
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter q"})
        
        fetch(encodeURI(`https://memekgede.herokuapp.com/api/kuso?q=${q}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
             status: 200,
             result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
        router.get('/getsticker', async (req, res, next) => {
          q = req.query.q
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter q"})
        
        fetch(encodeURI(`https://memekgede.herokuapp.com/api/getsticker?q=${q}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
             status: 200,
             result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
          router.get('/mediafire2', async (req, res, next) => {
          url = req.query.url
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})
        
        fetch(encodeURI(`https://memekgede.herokuapp.com/api/mediafire?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
             result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
        router.get('/nomorhoki', async (req, res, next) => {
          no = req.query.no
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!no) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter no"})
        
        fetch(encodeURI(`https://memekgede.herokuapp.com/api/nomer_hoki?nomer=${no}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
             result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
         router.get('/jodoh', async (req, res, next) => {
          nama = req.query.nama
          nama2 = req.query.nama2
          apikey = req.query.apikey;
          if (apikey === undefined) return res.status(404).send({
              status: 404,
              message: `Input Parameter apikey`
          });
          let limit = await isLimit(apikey);
          if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
          limitAdd(apikey);
          const check = await cekKey(apikey);
          if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
         if(!nama2) return res.json(loghandler.noname2)
        fetch(encodeURI(`https://restapppp.herokuapp.com/primbon/jodoh?nama1=${nama}&nama2=${nama2}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
           res.json({
             author: 'zul',
               result
           })
        })
        .catch(e => {
         res.json(loghandler.error)
        })
        })
        router.get('/mediafire', async (req, res, next) => {
          if (!req.query.url) return res.send({ status: 500, msg : 'Masukkan Parameter url'})
          apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        limitAdd(apikey);
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
          try {
          f = require ('../lib/mediafire')
          res.json(await f(req.query.url))
          } catch {
           res.send('TerJadi Kesalahan, Mungkin Url Tidak Valid')
          }
          })
    router.get('/asupan', async (req, res, next) => {
        apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        limitAdd(apikey);
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
          const asupan = JSON.parse(fs.readFileSync(__path +'/lib/data/asupan.json'));
          const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
          let hasil = Asupan.asupan;
          data = await fetch(hasil).then(v => v.buffer())
          await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
          res.sendFile(__path +'/tmp/asupan.mp4')
        })
        router.get('/brainly', async (req, res, next) => {
            yt = require('brainly-scraper')
            const q = req.query.q;
            const apikey = req.query.apikey;
            if (q === undefined || apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter q & apikey`
            });
            let limit = await isLimit(apikey);
            if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
            limitAdd(apikey);
            const check = await cekKey(apikey);
            if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
          ser = await yt(req.query.q)
          res.json(ser)
          })
          
    router.get("/memegen", async (req, res, next) => {
  
        apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        limitAdd(apikey);
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
        text = req.query.text;
        text2 = req.query.text2;
        img = req.query.img;
        if(!text) return res.json(loghandler.nottext)  
        if(!text2) return res.json(loghandler.nottext)
        if(!img) return res.json(loghandler.img)
              {
          let hasil = 'https://memekgede.herokuapp.com/api/meme-gen?top='+ text +'&bottom='+ text2 +'&img='+ img +'&apikey=ar'
          data = await fetch(hasil).then(v => v.buffer())
          await fs.writeFileSync(__path +'/tmp/meme-gen.jpg', data)
          res.sendFile(__path +'/tmp/meme-gen.jpg')
        }
      })
      router.get("/nulis", async (req, res, next) => {
  
        apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        limitAdd(apikey);
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
        text = req.query.text;
        
        if(!text) return res.json(loghandler.nottext)        
              {
          let hasil = 'https://api.zeks.xyz/api/nulis?text='+ text +'&apikey=AriaGanzTzy' 
          data = await fetch(hasil).then(v => v.buffer())
          await fs.writeFileSync(__path +'/tmp/nulis.jpeg', data)
          res.sendFile(__path +'/tmp/nulis.jpeg')
        }
      })
  
      router.get('/tahta', async(req, res, next) => {
         const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        text = req.query.text;
        
        if(!text) return res.json(loghandler.nottext)        
              {
        let hasil = 'https://api.zeks.xyz/api/hartatahta?text='+ text +'&apikey=AriaGanzTzy' 
        data = await fetch(hasil).then(v => v.buffer())
        await fs.writeFileSync(__path +'/tmp/tahta.jpg', data)
        res.sendFile(__path +'/tmp/tahta.jpg')
        }
      })
      router.get("/magernulis", async (req, res, next) => {
  
        const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        limitAdd(apikey);
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
         status: 403,
         message: `apikey ${apikey} not found, please register first!`
       });
         let limit = await isLimit(apikey);
         if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        nama = req.query.nama;
        kelas = req.query.kelas;
        text = req.query.text
        tinta = req.query.tinta
        if(!text) return res.json(loghandler.nottext)        
              {
          let hasil = 'https://api.zeks.xyz/api/magernulis?nama='+ nama +'&kelas='+ kelas +'&text='+ text +'&tinta='+ tinta +'&apikey=AriaGnzTzy' 
          data = await fetch(hasil).then(v => v.buffer())
          await fs.writeFileSync(__path +'/tmp/magernulis.jpeg', data)
          res.sendFile(__path +'/tmp/magernulis.jpeg')
        }
      })
      
    
router.get('/checkkey', async (req, res) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
      status: 404,
      message: `Input Parameter apikey`
  });
  limitAdd(apikey);
  const check = await cekKey(apikey);
  if (!check) return res.status(403).send({
   status: 403,
   message: `apikey ${apikey} not found, please register first!`
 });
   let limit = await isLimit(apikey);
   if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    res.send({status: 200, image: 'https://i.ibb.co/3zmmT3p/flaming.jpg', apikey: apikey, limit: limit});
});

router.get('/google', async (req, res, next) => {
     const apikey = req.query.apikey;
 if (apikey === undefined) return res.status(404).send({
     status: 404,
     message: `Input Parameter apikey`
 });
 limitAdd(apikey);
 const check = await cekKey(apikey);
 if (!check) return res.status(403).send({
  status: 403,
  message: `apikey ${apikey} not found, please register first!`
});
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    yt = require('google-it')
  if (!req.query.q) return res.json({ status: false, msg: 'Masukkan Parameter q'})
  ser = await yt({ query: req.query.q})
  res.json({ status: 'success', result: ser})
  })

  router.get('/tiny', async (req, res, next) => {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    limitAdd(apikey);
  request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
     try {
         res.json({
             status : true,
             creator : `${creator}`,
             result : {
                 link : `${body}`,
             },
             message : `Jangan Lupa Bersyukur Hari Ini:)`
         })
     } catch (e) {
         console.log('Error :')
         res.json(loghandler.invalidlink)
     }
  })
  })

  router.get('/joox', async (req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    limitAdd(apikey);
    res.json(await Joox(req.query.q))
    })

    router.get('/cerpen', async (req, res, next) => {
      const apikey = req.query.apikey;
      if (apikey === undefined) return res.status(404).send({
          status: 404,
          message: `Input Parameter query & apikey`
      });
      const check = await cekKey(apikey);
      if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first!`
      });
      let limit = await isLimit(apikey);
      if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
      limitAdd(apikey);

     fetch(encodeURI(`https://memekgede.herokuapp.com/api/cerpen`))
      .then(response => response.json())
      .then(data => {
      var result = data;
           res.json({
               creator : `${creator}`,
               result
           })
       })
       .catch(e => {
         res.json(loghandler.error)
})
})

router.get('/fml', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
      status: 404,
      message: `Input Parameter apikey`
  });
  const check = await cekKey(apikey);
  if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  limitAdd(apikey);

 fetch(encodeURI(`https://memekgede.herokuapp.com/api/fml`))
  .then(response => response.json())
  .then(data => {
  var result = data;
       res.json({
           creator : `${creator}`,
           result
       })
   })
   .catch(e => {
     res.json(loghandler.error)
})
})

router.get('/otakudesu', async (req, res, next) => {
  const query = req.query.q;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
      status: 404,
      message: `Input Parameter apikey`
  });
  const check = await cekKey(apikey);
  if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  limitAdd(apikey);
  //make the Search query then use GetDownload And put all the result into json using otakudesu.js lib
  const result = await Otakudesu(query);
  res.json({
      creator : `${creator}`,
      result
  })
})

router.get('/otakudesudonlod', async (req, res, next) => {
  const query = req.query.q;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
      status: 404,
      message: `Input Parameter apikey`
  });
  const check = await cekKey(apikey);
  if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  let limit = await isLimit(apikey);
  if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  limitAdd(apikey);
  //make the Search query then use GetDownload And put all the result into json using otakudesu.js lib
  const result = await Getdownload(query);
  res.json({
      creator : `${creator}`,
      result
  })
})

router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes1', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/motivasi', motivasi);

router.get('/oxy/:tema', photoOxy);

module.exports = router;
