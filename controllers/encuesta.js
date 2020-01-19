//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Survey  = mongoose.model('Survey');

exports.findById = function(req, res) {
	console.log('buscamos encuesta con id: ', req.params.id);
	Survey.findById(req.params.id, function(err, encuesta) {
		if(err) return res.status(500).send(err.message);
		console.log('GET /encuestas/' + req.params.id);
		res.status(200).jsonp(encuesta);
	});
};

exports.findByEmail = function(req, res) {
	Survey.find({autor: req.params.email}, function(err, encuesta) {
		if(err) return res.status(500).send(err.message);
		console.log('GET /usuarios/encuestas/' + req.params.email);
		res.status(200).jsonp(encuesta);
	});
};

exports.addEncuesta = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var survey = new Survey({
		id: 			req.body.id,
		config: 		req.body.config,
		title:  		req.body.title,
		buttonText: 	req.body.buttonText,
		autor:  		req.body.autor,
		creationDate: 	req.body.creationDate,
		votosTotales:   req.body.votosTotales,
		votosUsers: 	req.body.votosUsers,
		fields: 		req.body.fields
	});

	survey.save(function(err, survey) {
		if(err) return res.send(500, err.message);
    	res.status(200).jsonp(survey);
	});

};

//GET 
exports.findAllEncuestas = function(req, res) {
	console.log('entra');
	Survey.find(function(err, encuestas) {
    if(err) res.send(500, err.message);
		res.status(200).jsonp(encuestas);
	});
};

//PUT - Update a register already exists
exports.updateEncuesta = function(req, res) {
	console.log('Votar y actualizar encuesta: ', req.params.id);
	Survey.findById(req.params.id, function(err, survey) {
		if(err) return res.send(500, err.message);
		console.log('survey a actualizar', survey);
		survey.votosTotales = req.body.votosTotales;
		survey.votosUsers = req.body.votosUsers;
		survey.fields = req.body.fields;
		console.log('survey con votos: ', survey);
		survey.save(function(err, surveySaved) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(surveySaved);
		});
	});
};

//DELETE 
exports.deleteEncuesta = function(req, res) {
	console.log(req.params.id);
	Survey.findById(req.params.id, function(err, survey) {
		if(err) return res.status(500).send(err.message);
		survey.remove(function(err) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(true);
		})
	});
};
