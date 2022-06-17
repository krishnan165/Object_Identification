status="";
objects=[];
function preload()
{
  image1=loadImage("dog_cat.jpg");
}
function setup()
{
  canvas=createCanvas(640,420);
  canvas.center();

  object_detection=ml5.objectDetector("cocossd",modelLoaded);
  document.getElementById("status").innerHTML="Object Status:Detecting";
}

function modelLoaded()
{
  console.log("Model is loading");
  status=true;
  object_detection.detect(image1,gotResult);
}

function gotResult(error,results)
{
  if(error)
  {
    console.log(error);
  }
  else{
    console.log(results);
    objects=results;
  }
}

function draw()
{
   image(image1,0,0,640,420);

   if(status!="")
   {
   
      for(i=0;i<objects.length;i++)
      {
        document.getElementById("status").innerHTML="Object Status:Detected";
        fill("cyan");
        percent=floor(objects[i].confidence*100);
        textSize(20);
        text(objects[i].label+"  "+percent+" %",objects[i].x+10,objects[i].y+20);
        noFill();
        stroke("cyan");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }

    }

  
}