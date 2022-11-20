# share-stuff-yes
Sr Izan's ShareX custom uploader thing (gimme a name please)

# how to self host it yourself

We're going to be using Docker here.

### Step 1: Download the image
`docker pull srizan10/share-stuff` < Yeah, that's pretty straight forward, just install a simple Docker image.

### Step 2: Run the container (and mount the images as a volume)
You shouldn't have all your images in a container, because if there was some bug or data loss to the point where you can't backup the files, you're screwed.
`docker run -d -t --name sharex-sharestuff -v /host/path/to/have/your/files:/app/dist/i -e AUTHTOKEN=ARANDOMSTRING -e INSTANCEURL=https://yourinstancedomain.tld -p 80:8080 srizan10/share-stuff`
The `--name` can be changed to your liking.
On the volume part, change the `/host/path/to/have/your/files` to where you want to have the files hosted.
The `AUTHTOKEN` env variable should be a real long random string with special characters, numbers, letters... I mean, go crazy! Whoever has that token can upload ANYTHING to the server. [This is a solid generator](https://delinea.com/resources/password-generator-it-tool).
For the INSTANCEURL variable, you need to set the main URL the server without the slash at the end. For example: `https://thissubdomainisanexample.srizan.ml` and NOT `https://thissubdomainisanexample.srizan.ml/`.
In `-p` you can edit the first part, aka the port.

### Step 3: Enjoy!

Congrats, you did it!