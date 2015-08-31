// products

var app = app || {};
app.blueprints = app.blueprints || {};
app.active = app.active || {};

/*----------------------------------------------------
		M O D E L  C O N S T R U C T O R S
----------------------------------------------------*/	

app.blueprints.productModel = Backbone.Model.extend({
	initialize: function() {
		console.log('A product model has been instantiated...');
		
	}
});

/*----------------------------------------------------
	C O L L E C T I O N  C O N S T R U C T O R S
----------------------------------------------------*/

app.blueprints.productCollection = Backbone.Collection.extend({
	url: '/api/products',
	model: app.blueprints.productModel,
	initialize: function() {
		console.log('a products collection has been instantiated...');
		this.fetch();
		this.on('change', function() {
			this.fetch();
		})
	}
});


/*----------------------------------------------------
		V I E W  C O N S T R U C T O R S
----------------------------------------------------*/
app.blueprints.productCollectionView = Backbone.View.extend({
	initialize: function() {
		console.log('product collection view has been instantiated...');
		this.render();
		var that = this;
		this.collection.on('sync', function() {
			that.render();
		});
	},
	el: $('#service-radio'),
	render: function() {
		var productsModels = this.collection.models;
		productsModels.forEach(function(model) {
			new app.blueprints.productModelView({
				model: model
			});
		});
		//draw the services buttonset
		$(function() { $('#service-radio').buttonset(); });
		// set the service selector scroll handler
		radio_scroll_handler('service');
	}
});

app.blueprints.productModelView = Backbone.View.extend({
	initialize: function() {
		console.log('A product model view has been instantiated...');
		this.$el = $('#service-radio');
		this.render();
	},
	render: function() {
		var singleProductTemplate = $('#productTemplate').html();
		var renderProductTemplate = _.template(singleProductTemplate);
		this.$el.append(renderProductTemplate(this.model.attributes));
	}

});

$(document).ready(function() {

	/*----------------------------------------------------
					I N S T A N T I A T I O N
	----------------------------------------------------*/
	// instantiate a product collection
	app.active.productCollection = new app.blueprints.productCollection();
	//get the products kicked to the DOM
	app.active.productCollectionView = new app.blueprints.productCollectionView({
		collection: app.active.productCollection
	});

}); // end document.ready
