var fileReader = new FileReader();
var filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

fileReader.onload = function(event) {
  var image = new Image();

  image.onload = function() {
    document.getElementById("original-Img").src = image.src;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = image.width / 4;
    canvas.height = image.height / 4;
    context.drawImage(image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    document.getElementById("upload-Preview").src = canvas.toDataURL();
  }
  image.src = event.target.result;
  alert(event.target.result);
};

var loadImageFile = function() {
  var myblob = new Blob();
  var img = new Image;
  var c = document.createElement("canvas");
  var ctx = c.getContext("2d");

  img.crossOrigin = "Anonymous"; // if from different origin
  img.src = localStorage.getItem('location');

  img.onload = function() {
    c.width = this.naturalWidth; // update canvas size to match image
    c.height = this.naturalHeight;
    ctx.drawImage(this, 0, 0); // draw in image
    c.toBlob(function(blob) { // get content as JPEG blob
      // here the image is a blob
      myblob = blob;
      //Is Used for validate a valid file.
      var uploadFile = blob;
      if (!filterType.test(uploadFile.type)) {
        alert("Please select a valid image.");
        return;
      }
      console.log(uploadFile);
      fileReader.readAsDataURL(uploadFile);
    }, "image/jpg", 0.75);
  };
}
