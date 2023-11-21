
let uploadimg = document.getElementById('uploadimg');
var cropper;
const handlefile = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageElement = document.getElementById('uploadimg');
        imageElement.src = e.target.result;
        cropper = new Cropper(uploadimg, {
            aspectRatio: 1,
            viewMode: 0,
        })
        document.getElementById('cropbtn').style.display = "block";
    };

    reader.readAsDataURL(file);

};



document.getElementById('cropbtn').addEventListener('click',
    function () {
        var croppedimg = cropper.getCroppedCanvas().toDataURL("image/webp");
        try {
            fetch('http://localhost:3000/upload', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: croppedimg
                }),

            }).then((res) => {
                document.getElementById('cropbtn').style.display = "none";
                document.getElementById('cropcont').style.display = "none";
            })
        } catch (error) {
            console.log(error)
        }
    })


window.onload = function () {
    fetch('http://localhost:3000/getimages').then(respose => respose.json()).then((data) => {
        document.getElementById('images').innerHTML = "";
        data.images.forEach(element => {
            document.getElementById('images').innerHTML += `
            <div class="container">
            <img src="${element.image}" alt="image" class="d-block my-5 mx-auto" style="max-width: 30vw; max-height: 30vh" ">
            </div>
            `
        })
    })
}