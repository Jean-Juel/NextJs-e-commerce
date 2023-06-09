import multiparty from 'multiparty'
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import fs from 'fs'
import mime from "mime-types";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    // res.setHeader('Content-Type', 'application/json')
    // res.setHeader('charset', 'utf-8')
    await isAdminRequest(req,res);

    const form = new multiparty.Form()
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, function(err, fields, files)  {
            if (err) reject(err)
            resolve({fields, files})
        })
    })
    const client = new S3Client({
        region: 'eu-west-3',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    })
    const links = []
    for (const file of files.file) {
        const extension = file.originalFilename.split('.').pop()
        const newFilename = Date.now() + '.' + extension
        await client.send(new PutObjectCommand({
            Bucket: process.env.BUCKETNAME,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ContentType: mime.lookup(file.path)
        }))
        const link = `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${newFilename}`;
        links.push(link)
    }
    return res.json({links})
}

export const config = {
    api: {bodyParser: false}
}