const sharp = require('sharp')
const compressImages = require('compress-images')
const path = require('path')
const fs = require('fs')

const imageName = process.argv[2]
const width = Number(process.argv[3])

const inputPath = path.join(__dirname, 'src', 'data', 'input', imageName)
const tempPathImage = path.join(__dirname, 'src', 'data', 'temp', 'image_compressed.jpg')

function resizeCompress(inputPath, outputPath, width) {
        sharp(inputPath)
            .resize({width: width})
            .toFile(outputPath, (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log('Imagem redimensionada com sucesso!');
                    compress("./src/data/temp/image_compressed.jpg", './src/data/output/')
                } 
            })
}

function compress(inputPath, outputPath) {

    compressImages(inputPath, outputPath,
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      {
        gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
      },
      function (err, completed) {
        if (completed === true) {
            removeTemp()
            console.log('teste');
        } else {
            console.log('deu erro');
        }
      }
    );
}

function removeTemp() {
    fs.unlinkSync(tempPathImage, (err) => {
        if (err) {
            console.log('Ocorreu um erro ao remover o arquivo temporario');
        } else {
            console.log('Imagem temporaria removida com sucesso!');
        }
    })
}


resizeCompress(inputPath, tempPathImage, width)






