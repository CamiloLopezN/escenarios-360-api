const mongoose=require("../config/config.database"),Marker=require("../models/entity.model")["Marker"],authorize=require("../middlewares/oauth/authentication")["authorize"],{STATUS_400,STATUS_500,STATUS_200,STATUS_404}=require("../utils/constants"),postMarker=async(e,r)=>{var{markerId:e,longitude:t,latitude:a,image:s,width:o,height:n,anchor:i,tooltip:u,content:d,data:g}=e.body;const m=new Marker({markerId:e,longitude:t,latitude:a,image:s,width:o,height:n,anchor:i,tooltip:u,content:d,data:g});try{await Marker.findOne({markerId:e})||await m.save()}catch(e){return e instanceof mongoose.Error.ValidationError?r.status(400).json({message:STATUS_400,errors:e.errors}):r.status(500).json({message:STATUS_500})}return r.status(200).json({message:STATUS_200})},getMarkers=(module.exports.postMarker=[authorize(),postMarker],async(e,r)=>{var t=parseInt(e.query.limit,10)||10,e=parseInt(e.query.page,10)||1;let a;try{if(!(a=await Marker.paginate({},{projection:{createdAt:0,updatedAt:0,__v:0},limit:t,page:e})))return r.status(404).json({message:STATUS_404})}catch(e){return e instanceof mongoose.Error.ValidationError?r.status(400).json({message:STATUS_400}):r.status(500).json({message:STATUS_500})}return r.status(200).json({message:a})}),getMarkerById=(module.exports.getMarkers=[authorize(),getMarkers],async(e,r)=>{e=e.params.id;console.log(e);try{var t=await Marker.findOne({id:e});return t?r.status(200).json({message:t}):r.status(404).json({message:STATUS_404})}catch(e){return e instanceof mongoose.Error.ValidationError?r.status(400).json({message:STATUS_400}):r.status(500).json({message:STATUS_500})}});module.exports.getMarkerById=[authorize(),getMarkerById];