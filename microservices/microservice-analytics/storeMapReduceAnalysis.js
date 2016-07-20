var userMapReduceSchema = require('../../models/userMonthlyGameStat'),
    userPointsSchema = require('../../models/userPointsStat'),
    analyticsDbObj = require('.././analyticsDbConObj'),
    mapReduceObj = analyticsDbObj.model('userMonthlyGamePlayedStat', userMapReduceSchema),
    mapReduceObjVisit = analyticsDbObj.model('userMonthlyVisitCountStat', userMapReduceSchema),
    moment = require('moment');
    mapReduceObjPoint = analyticsDbObj.model('userPointStat', userPointsSchema);

module.exports = {
    getMapReduceData :function(newRec,done){
        //  check if a record already exists with the user Id
        mapReduceObj.findOne({userId: newRec.userId},function(err,collectionData){
            if (err) {
                console.log("MongoDB Error: " + err);
                done( { 'error': 'dbErr'} );
            }
            if (!collectionData) {
                console.log("No item found, creating collectionData item");
                new mapReduceObj(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                });
                done( { 'error': 'dbErr-NoItemFound'} );
            }
            else if (collectionData.length === 0){
                console.log("Zero found, creating collectionData item");
                new mapReduceObj(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                });
                done( { 'error': 'dbErr-dataLengthZero'} );
            }
            else {
                var yearPresent = false,
                    notMatchedMonthObjArr = [];
                collectionData.years.forEach(function(vals){
                    if ( vals.yearVal === newRec.years[0].yearVal){
                        // so we have year present now add or update the month value
                        yearPresent = true;
                        newRec.years[0].monthObj.forEach(function(localMObj){
                            var monthFoundFlag = false;
                            for ( i = 0; i < vals.monthObj.length; i++ ){
                                if ( vals.monthObj[i].month === localMObj.month){
                                    vals.monthObj[i].count += localMObj.count;
                                    vals.yearlyCount += localMObj.count;
                                    monthFoundFlag = true;
                                    break;
                                }
                            }
                            if ( !monthFoundFlag ) {
                                notMatchedMonthObjArr.push(localMObj);
                            }
                        });
                    }
                    notMatchedMonthObjArr.forEach(function(mObj){
                        vals.monthObj.push(mObj);
                        vals.yearlyCount += mObj.count;
                    });

                });
                // means we did not got any matching year value so create it
                if ( !yearPresent ){
                    console.log("Year not present appending !" );
                    newRec.years.forEach(function(arr){
                        collectionData.years.push(arr);
                    });
                }
                // Save data once  dataset is modified
                collectionData.save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Record Updated!");
                    }
                });
                done(collectionData);
            }
        });
    },


    saveMapReduceVisitCount :function(newRec,done){
        //  check if a record already exists with the user Id
        mapReduceObjVisit.findOne({userId: newRec.userId},function(err,collectionData){
            if (err) {
                console.log("MongoDB Error: " + err);
                done( { 'error': 'dbErr'} );
            }
            if (!collectionData) {
                console.log("No item found, creating collectionData item");
                // add consecutiveCount  for login
                newRec.consecutiveCount = 1;
                new mapReduceObjVisit(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data" +err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                });
                done( { 'error': 'dbErr-NoItemFound'} );
            }
            else if (collectionData.length === 0){
                newRec.consecutiveCount = 1;
                console.log("Zero found, creating collectionData item");
                new mapReduceObjVisit(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                });
                done( { 'error': 'dbErr-dataLengthZero'} );
            }
            else {
                var oldDate = collectionData.timeStamp;
                oldDate = oldDate.getFullYear()+"-"+Number(oldDate.getMonth()+1)+"-"+oldDate.getDate();
                oldDate = moment(oldDate,"YYYY-MM-DD");
                var oldNextDate = oldDate.add(1, 'days');
                oldNextDate = oldNextDate.format('YYYY-MM-DD');
                oldDate = moment(oldDate,"YYYY-MM-DD").format('YYYY-MM-DD');
                var newDate = new Date();

                newDate = newDate.getFullYear()+"-"+Number(newDate.getMonth()+1)+"-"+newDate.getDate();
                newDate = moment(newDate,"YYYY-MM-DD").format('YYYY-MM-DD');

                // check if we need to increment "consecutiveCount" in db
                collectionData.consecutiveCount = 1;
                collectionData.timeStamp = new Date();
                if( oldNextDate === newDate){
                    collectionData.consecutiveCount += 1;
                }
                var yearPresent = false,
                    notMatchedMonthObjArr = [];
                collectionData.years.forEach(function(vals){
                    if ( vals.yearVal === newRec.years[0].yearVal){
                        // so we have year present now add or update the month value
                        yearPresent = true;
                        newRec.years[0].monthObj.forEach(function(localMObj){
                            var monthFoundFlag = false;
                            for ( i = 0; i < vals.monthObj.length; i++ ){
                                if ( vals.monthObj[i].month === localMObj.month){
                                    vals.monthObj[i].count += localMObj.count;
                                    vals.yearlyCount += localMObj.count;
                                    monthFoundFlag = true;
                                    break;
                                }
                            }
                            if ( !monthFoundFlag ) {
                                notMatchedMonthObjArr.push(localMObj);
                            }
                        });
                    }
                    notMatchedMonthObjArr.forEach(function(mObj){
                        vals.monthObj.push(mObj);
                        vals.yearlyCount += mObj.count;
                    });

                });
                // means we did not got any matching year value so create it
                if ( !yearPresent ){
                    console.log("Year not present appending !" );
                    newRec.years.forEach(function(arr){
                        collectionData.years.push(arr);
                    });
                }
                // Save data once  dataset is modified
                collectionData.save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Record Updated!");
                    }
                });
                done(collectionData);
            }
        });
    },
// function to parse points data from mapreduec result and storing
// data to "userPointStat" table
    saveMapReduceUserPoints :function(newRec,done){
        //  check if a record already exists with the user Id
        mapReduceObjPoint.findOne({userId: newRec.userId},function(err,collectionData){
            if (err) {
                console.log("MongoDB Error: " + err);
                done( { 'error': 'dbErr'} );
            }
            if (!collectionData) {
                console.log("No item found, creating collectionData item");
                new mapReduceObjPoint(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                });
                done( { 'error': 'dbErr-NoItemFound'} );
            }
            else if (collectionData.length === 0){
                console.log("Zero found, creating collectionData item");
                new mapReduceObjPoint(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                });
                done( { 'error': 'dbErr-dataLengthZero'} );
            }
            else {
                console.log("Found one collectionData item: " );
                collectionData.timeStamp = newRec.timeStamp;
                //
                // collectionData.totalPoint += newRec.totalPoint;
                collectionData.totalPoint = newRec.totalPoint;
                if ( newRec.userStreak.streakDates.length >= collectionData.userStreak.streakDates.length){
                    collectionData.userStreak = newRec.userStreak;
                }

                // Save data once  dataset is modified
                collectionData.save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Record Updated!");
                    }
                });
                done(collectionData);
            }
        });
    },



    saveMRUserRespTimeStat :function(newRec,done){
        //  check if a record already exists with the user IduserPointStat
        mapReduceObjPoint.findOne({userId: newRec.userId},function(err,collectionData){
            if (err) {
                console.log("MongoDB Error: " + err);
                done( { 'error': 'dbErr'} );
            }
            if (!collectionData) {
                console.log("No item found, creating collectionData item");
                newRec.timeStamp = new Date().toString();
                newRec.lastUpdatedRespTime = new Date().toString();
                newRec.totalPoint = 0;
                new mapReduceObjPoint(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                    done( { 'error': 'dbErr-NoItemFound'} );
                });
                // done( { 'error': 'dbErr-NoItemFound'} );
            }
            else if (collectionData.length === 0){
                console.log("Zero found, creating collectionData item");
                newRec.timeStamp = new Date().toString();
                newRec.lastUpdatedRespTime = new Date().toString();
                newRec.totalPoint = 0;
                new mapReduceObjPoint(newRec).save(function(err){
                    if(err){
                        console.log("Error updating data"+err);
                    }
                    else {
                        console.log("Updated Record!!");
                    }
                    done( { 'error': 'dbErr-dataLengthZero'} );
                });
                // done( { 'error': 'dbErr-dataLengthZero'} );
            }
            else {
                console.log("Found one collectionData item: " );
                // collectionData.userId = newRec.userId;
                collectionData.lastUpdatedRespTime = new Date().toString();
                if (collectionData.totalResponseTime){
                    collectionData.totalResponseTime += newRec.totalResponseTime;
                }
                else{
                    collectionData.totalResponseTime = newRec.totalResponseTime;
                }
                if (collectionData.numOfQuesAttempted){
                    collectionData.numOfQuesAttempted += newRec.numOfQuesAttempted;
                }
                else {
                    collectionData.numOfQuesAttempted = newRec.numOfQuesAttempted;
                }
                if (collectionData.avgResponseTime){
                    collectionData.avgResponseTime = (collectionData.avgResponseTime+newRec.avgResponseTime)/2;
                }
                else {
                    collectionData.avgResponseTime = newRec.avgResponseTime;
                }
                if(collectionData.correctResponseCount){
                    collectionData.correctResponseCount += newRec.correctResponseCount;
                }
                else {
                    collectionData.correctResponseCount = newRec.correctResponseCount;
                }
                if(collectionData.wrongResponseCount){
                    collectionData.wrongResponseCount += newRec.wrongResponseCount;
                }
                else {
                    collectionData.wrongResponseCount = newRec.wrongResponseCount;
                }
                if(collectionData.skipResponseCount){
                    collectionData.skipResponseCount += newRec.skipResponseCount;
                }
                else {
                    collectionData.skipResponseCount = newRec.skipResponseCount;
                }
                if(collectionData.correctPercentage){
                    collectionData.correctPercentage = (collectionData.correctResponseCount * 100)/collectionData.numOfQuesAttempted;
                }
                else {
                    collectionData.correctPercentage = newRec.correctPercentage;
                }
                if(collectionData.wrongPercentage){
                    collectionData.wrongPercentage = (collectionData.wrongResponseCount * 100)/collectionData.numOfQuesAttempted;
                }
                else {
                    collectionData.wrongPercentage = newRec.wrongPercentage;
                }
                if(collectionData.skipPercentage){
                    collectionData.skipPercentage = (collectionData.skipResponseCount * 100)/collectionData.numOfQuesAttempted;
                }
                else {
                    collectionData.skipPercentage = newRec.skipPercentage;
                }
                // Save data once  dataset is modified
                collectionData.save(function(err){
                    if(err){
                        console.log("Error updating data" +err);
                    }
                    else {
                        console.log("Record Updated!");
                    }
                    done(collectionData);
                });
                // done(collectionData);
            }
        });
    }
};
