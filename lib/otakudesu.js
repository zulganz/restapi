const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://otakudesu.live'

const headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
	"cookie": "_ga=GA1.2.94384000.1635596588; _gid=GA1.2.919815583.1635596588; _gat=1"
}

async function Otakudesu(querry) {
	try {
	const res_ = await axios.get(`${baseUrl}?s=${querry}&post_type=anime` , {headers})
	const sopp = cheerio.load(res_.data)
	const hasil = []
	const link_dl = {}
	const judul_ = sopp('h2').eq(0).text()
	const link_ = sopp('h2 > a').attr('title')
	const thumb_ = sopp('li > img').attr('src')
	const genre = sopp('li > div.set').eq(0).text().replace('Genres : ','')
	const status = sopp('li > div.set').eq(1).text().replace('Status : ','')
	const rating = sopp('li > div.set').eq(2).text().replace('Rating : ','')
	const ress_ = await axios.get(`${link_}`)
	const soup = cheerio.load(ress_.data)
	const producer = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(4)').text().replace('Produser: ','')
	const studio = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(10)').text().replace('Studio:  ','')
	const total_eps = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(7)').text().replace('Total Episode: ','')
	const japanese_title = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(2)').text().replace('Japanese: ','')
	const tipe = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(5)').text().replace('Tipe: ','')
	const durasi = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(8)').text().replace('Durasi: ','')
	const tgl_rilis = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(9)').text().replace('Tanggal Rilis: ','')
	const sinopsis = soup(' div.venser > div.fotoanime > div.sinopc > p').text()   
	const batch = soup(' div.venser > div.episodelist > ul > li >span > a').attr('href')
	const resss_ = await axios.get(`${batch}`)
	const sop = cheerio.load(resss_.data)
	const empatDrive = sop('div.venser > div.download > div.batchlink > ul > li > a').eq(8).attr('href')
	const tigaDrive =  sop('div.venser > div.download > div.batchlink > ul > li > a').eq(1).attr('href')
	const tujuhDrive = sop('div.venser > div.download > div.batchlink > ul > li > a').eq(15).attr('href')
	link_dl['360p'] = tigaDrive
	link_dl['480p'] = empatDrive
	link_dl['720p'] = tujuhDrive
	hasil.push({ judul_, link_, thumb_, genre, status, rating, producer, total_eps, sinopsis, japanese_title, tipe, durasi, tgl_rilis, studio, batch, link_dl,tigaDrive,empatDrive,tujuhDrive })
	
	return hasil
} catch (error) {
	const notFond = {
		creator: '@Zul',
		status: 400,
		Pesan: 'sorry cuk lagi eror :('
	}
	return notFond
}
}

async function Getdownload(query) {
	try{
		//if the episode is not complete then return
		const res_ = await axios.get(`${baseUrl}?s=${querry}&post_type=anime` , {headers})
		const sopp = cheerio.load(res_.data)
		const link_ = sopp('h2 > a').attr('title')
		const ress_ = await axios.get(`${link_}`)
		const soup = cheerio.load(ress_.data)
		const total_eps = soup(' div.venser > div.fotoanime > div.infozin > div.infozingle > p:nth-child(7)').text().replace('Total Episode: ','')
		const episode = soup('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
		const resss_ = await axios.get(`${episode}`)
		const sop = cheerio.load(resss_.data)
		const link_dl = {}
		//make a loop
		let loop = 2
		for (let i = 2; i <= total_eps; i--) {
			loop = loop * 2
			const link = sop(`#venkonten > div:nth-child(6) > ul:nth-child(${loop}) > li:nth-child(1) > a:nth-child(2)`)
		}

		if(total_eps == '?') {
			const notComplete = {
				creator: '@Zul',
				status: 400,
				Pesan: 'Sorry cuk episode belum selesai :('
			}
			return notComplete
		}
	
 } catch (err) {
	const notFond = {
		creator: '@Zul',
		status: link.status,
		Pesan: 'sorry cuk lagi eror :('
	}
	return notFond
}
}
module.exports.Otakudesu = Otakudesu
module.exports.Getdownload = Getdownload