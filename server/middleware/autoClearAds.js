
// // auto delete ads who time is out logic 
// if (ads.length) {
//   ads.forEach(element => {
//     const date1 = new Date(element.createdAt.toString());
//     const date2 = new Date();
//     const daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));

//     if (daysLag >= element.killDate) {
//       dispatch(deleteAd(element._id, { userId }));
//     }
//   });
// }
// // eslint-disable-next-line react-hooks/exhaustive-deps
