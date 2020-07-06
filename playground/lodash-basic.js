const _ = require("lodash")
const user_1 = {
    name: "Nguyen van A",
    age:28,
    education:{
        university:"UIT"
    },
    job: [
        {
            major: "Teacher",
            type: "fulltime"
        },
        {
            major: "dev",
            type: "parttime"
        }
    ]
}

const user_2 = {
    name: "Nguyen van B",
    age:20,
    education:{
        university:"BKU"
    }
}

const users = [user_1,user_2];

users.forEach(user => {
    // if(user.job && user.job.length>0){
    //     console.log(user.job[0].major)
    // }
    // else console.log(null)  
    console.log(_.get(user,"job[0].major","Thất nghiệp"))
});

const url = "https://cybersoft.edu.vn/courses/1/chapters/2/video/5"

//use js
// const coursesIndex = url.split("/").indexOf("courses")
// const coursesId = coursesIndex+1
// const chaptersIndex = url.split("/").indexOf("chapters")
// const chaptersId = chaptersIndex+1
// const videoIndex = url.split("/").indexOf("video")
// const videoId = videoIndex+1
// console.log("coursesId : " ,url.split("/")[coursesId]);
// console.log("chaptersId : " ,url.split("/")[chaptersId]);
// console.log("videoId : " ,url.split("/")[videoId]);

// const getObjectId = (type) => {
//     return _.chain(url)
//     .split("/")  //array
//     .indexOf(type) //index của courses
//     .thru(value =>value + 1) //index của courseId
//     .thru(value => {    //index cần tìm
//         return _.chain(url)
//         .split("/")
//         .get(value)
//         .value()
//     })
//     .value()
// }

// console.log(getObjectId("courses"))
// console.log(getObjectId("chapters"))
// console.log(getObjectId("video"))
