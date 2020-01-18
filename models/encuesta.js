exports = module.exports = function(app, mongoose) {

	var encuestaSchema = new mongoose.Schema({
		id: 		{ type: Number },
		title: 		{ type: String },
		buttonText: 	{ type: String },
		autor:  	{ type: String },
		creationDate: 	{ type: Date },
		config: 	{ type: Array },
		fields: 	{ type: Array },
		votosTotales: 	{ type: Number },
		votosUsers: { type: Array }
	});

	mongoose.model('Survey', encuestaSchema);

};
