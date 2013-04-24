   var it_select;
   var prefix = '';
   var displayed = false;
   
   String.prototype.trunc = 
	   function(n,useWordBoundary){
       var toLong = this.length>n,
           s_ = toLong ? this.substr(0,n-1) : this;
       s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
       return  toLong ? s_ + '...' : s_;
    };
	      
   $("document").ready(function(){
	   
	   it_select = $('#release-select').chosen()
	   
//	   $('.modal').modal({
//		   show:false
//	   });
	   
	   getReleases();
	   
	   makeResizable()
	   
//	   adjustContainers()
	   
	  $(window).resize(function() {
		});	
	   
       $('#release-select').live({
          change: function(){
              itSelected($(this).find('option:selected'))
          }
        })
        
        $('.feature').live({
          click: function(){
        	  loadFeatureDesc($(this).data('desc'))
              getTC($(this).attr('feature-id'))
              //$('.right-pannel').show('fast')
     		 $( ".right-pannel" ).css({
			   'padding-bottom':$('#desc-wrapper').height()+29
		   })
        	  displayed = true
          }
        })

        $('.desc-expander').live({
          click: function(){
        	  expandIssueDescription();
//        	  $('.modal').modal('show')
          }
        })
        $('.desc-collapser').live({
          click: function(){
        	  collapsIssueDescription();
        	  
          }
        })
        $('.refresh-icon').live({
          click: function(){
        	  $(this).addClass('refreshing');
        	  clearData()
        	  collapsIssueDescription();
        	  getReleases();
          }
        })
        
        $('.tc-expander').live({
          click: function(){
        	  $(this).parents('.tc').find('.tc-steps').show('fast')
        	  $(this).removeClass('tc-expander').addClass('tc-collapse');
          }
        })
        
        $('.tc-collapse').live({
          click: function(){
        	  $(this).parents('.tc').find('.tc-steps').hide('fast')
        	  $(this).removeClass('tc-collapse').addClass('tc-expander');
          }
        })
       
   })
 
   function adjustContainers(){
	   var fc = $('#feature-container').height() -$('.toolbar').height();
	   fc=(fc*100)/$('.left-pannel').height() + '%'
	   $('#feature-container').css('height',fc)
	   var tcc = $('#tc-container').height() - $('.desc-header').height();
	   $('#tc-container').css('height',tcc)
	   }
   
 function makeResizable(){
	   

	$('#desc-wrapper').resizable({
		handles : 's',
		minHeight : 100,
		alsoResize : "#desc-container",

		stop : function() {
			$("#desc-container").css({
				'height' : $('#desc-wrapper').height() - 20,
				'width' : '100%'
			})
			$(".right-pannel").css({
				'padding-bottom' : $('#desc-wrapper').height() + 29
			})
		}
	})

	$("#desc-container").resizable({
		ghost : true,
		handles : 's'
	});
 		
 		

   $("#lp-wrapper").resizable({
		handles : 'e',
		minWidth : 218,
		containment : '#pannel-wrapper',
		stop : function() {
			$("#feature-container").css({
				'height' : '100%',
				'width' : '100%'
			})
			$(this).css({
						'height' : '100%',
						'width' : (($(this).width() * 100) / $(
								'.tcm-container').width()) + '%'
			});
		}
	});
   }  
   
function _makeResizable(){
	   
 	  $('.handle').draggable({ 
 		  axis: "x",
 			  stop:function(){
 				  var elem = $(this);
 				  var pl = elem.offset().left - elem.parents('body').offset().left - $('.left-pannel').position().left;
 				  //var pl = Math.round((((elem.offset().left - elem.parents('body').offset().left) /*- $('.left-pannel').position().left*/) * 100)/$(document).width()) +'%'
 				  $( ".left-pannel" ).css("width", pl)
 				  $(this).position({
 					  my:        "left",
 					  at:        "right",
 					  of:        $( ".left-pannel" ), // or $("#otherdiv)
 					  collision: "fit"
 				  })
 			  }
 	  });
   }
   
  function renderFeatureBar(feature){
	   var prob = $(feature).find('.bar');
	   var current_max = $(feature).find('.count').text().split('/')
	   var current_value = parseInt(current_max[0]); 
	   var maximun = parseInt(current_max[1])
	   
	   prob.progressbar({
		      value: current_value,
		      max:maximun,
		      change: function() {
		        
		      },
		      complete: function() {
		    	  
		      }
		    });
	   prob.css({
		   'width': '40px',
		   'height': '12',
		   'border': '1px solid #6C7885'
	   }).find('.ui-progressbar-value').css({
		   'border-color': '#8695A8',
		   'background':'#B1BBC8'
	   })
	   
  }

   
   
   
   
  //var domain = window.location.href
function expandIssueDescription(){
	$('#desc-wrapper').show('fast',function(){
		 $( ".right-pannel" ).css({
			   'padding-bottom':$('#desc-wrapper').height()+29
		   })
	})
	
	   $('#desc-expander').removeClass('desc-expander').addClass('desc-collapser')
   }
   
   function collapsIssueDescription(){
	   $('#desc-wrapper').hide('fast',function(){
			 $( ".right-pannel" ).css({
				   'padding-bottom':29
			   })
	   })
	   $('#desc-expander').removeClass('desc-collapser').addClass('desc-expander')
   }
    var releases = {
    url: '/getDB',  
  
    fetch: function () {
      return $.ajax({
				type: "GET",
				url: this.url,
				dataType: "json"
			});
    }
  };
   
  var features = {
    url: '/getFeatures?itId=',  
  
    fetch: function (iterationid) {
      return $.ajax({
				type: "GET",
				url: this.url + iterationid,
				dataType: "json"
			});
    }
  };
   
   var test_cases = {
		    url: '/getTcs?ftId=',  
		  
		    fetch: function (feature_id) {
		      return $.ajax({
						type: "GET",
						url: this.url + feature_id,
						dataType: "json"
					});
		    }
   };

   var feature_teststats ={
		    url: '/getFeatureTests?ftId=',  
			  
		    fetch: function (feature_id) {
		      return $.ajax({
						type: "GET",
						url: this.url + feature_id,
						dataType: "json"
					});
		    }   
  
   }
   
function getReleases(){
	releases.fetch().done(function(data){
		//[{"releaseName":"27","iterationName":"16,18,19,20,21,22"},{"releaseName":"28","iterationName":"23,24,25"}]
		
		$('#release-select').find('optgroup').remove();
		$(data).each(function(){
			var optionG = $('<optgroup>').attr('label', "Release "+this.releaseName)
			var iterations = this.iterationName.split(',')
			$(iterations).each(function(){
				var option = $('<option>').attr('value', this).text(prefix + this);
				$(optionG).append(option);
			})
			$('#release-select').append(optionG)
		})
		$('#release-select').trigger("liszt:updated")
		$('.refresh-icon').removeClass('refreshing')
	});
}   

function getTC(feature_id){
	
	test_cases.fetch(feature_id).done(function(data){
		prepareTCs(data)
	})
}   
function prepareTCs(data){
	$('#tc-container').children().remove();
	$(data).each(function(){
        
//		  {
//		        "statusName": "Not RUN",
//		        "tcName": "change regions",
//		        "tcId": 1,
//		        "tcDescription": "first deloy to region A then deploy to region",
//		        "lastRun": null,
//		        "proposed": false
//		    },
		
		switch(this.statusId)
		{
		case 0:
			statusClass = 'notrun'
		  break;
		case 1:
			statusClass = 'inprogress'
		  break;
		case 2:
			statusClass = 'block'
		  break;
		case 3:
			statusClass = 'failed'
		  break;
		case 4:
			statusClass = 'pass'
		  break;
		default:
		  statusClass = ''
		}
		
	
		
    	var tc = $('<div>').addClass('tc').attr('tc-id',this.tcId)
    	var wrapper = $('<div>').addClass('wrapper')
    	var expander = $('<div>').addClass('tc-expander ds')
    	var description = $('<div>').addClass('tc-description ds').text(this.tcName.trunc(100,false))
    	var stats = $('<div>').addClass('tc-stats ds')
    	var status = $('<div>').addClass('tc-status '+ statusClass).attr('status', this.statusId).attr('title', this.statusName)
    	var steps = $('<div>').addClass('tc-steps').text(this.tcDescription).css('display','none');
    	
    	$(stats).append(status)
    	$(wrapper).append(description,expander, stats)
    	$(tc).append(wrapper,steps)
    	
    	renderTC(tc)
    	
    })
	
}   

function clearData(){
	$('#feature-container').children().remove()
	$('#desc-container').children().remove()
	$('#desc-container').text('');
	$('#desc-wrapper').hide()
	$('#desc-expander').removeClass('desc-collapser').addClass('desc-expander')
	$('#tc-container').children().remove()
}

function itSelected(selected_node){
	 //console.log($(selected_node).val())

	  iteration_name = $(selected_node).val().replace(prefix ,'')
	  
	  features.fetch(iteration_name).done(function(data){
			clearData();
		  prepareFeatures(data)
	  });

}

function prepareFeatures(data){ 
    $(data).each(function(){
    
    	//[{"jiraKey":"ION-2333","featureName":"Enable global deployment","featureDescription":"hay que hacer muchas cosas locas","featureId":1}]
    	
    	var feature = $('<div>').addClass('feature').attr('feature-id',this.featureId).data('desc', this.featureDescription)
    	var title_bar = $('<div>').addClass('title-bar')
    	var jiraKey = $('<div>').addClass('jira-key').text(this.jiraKey)
    	var summary = $('<div>').addClass('summary').text(this.featureName)
    	var stats = $('<div>').addClass('stats')
    	var count = $('<div>').addClass('count')
    	var bar = $('<div>').addClass('bar')
    	
    	$(stats).append(bar,count)
    	$(title_bar).append(jiraKey,stats);
    	$(feature).append(title_bar,summary);
    	
    	renderFeature(feature)
    	
    })
}

function renderStatsCount(feature,data){
	data = data[0]
	$(feature).find('.count').text(data.run+'/'+data.total);
	
}

function renderFeature(feature){
	var feature_id = $(feature).attr('feature-id');
	console.log(feature_id)
	$('#feature-container').append(feature);
	$(feature).find('.stats').addClass('loading-small');
	feature_teststats.fetch(feature_id).done(function(data){
		renderStatsCount(feature, data)
		renderFeatureBar(feature);
		$(feature).find('.stats').removeClass('loading-small');
	})
	
}

function loadFeatureDesc(desc){
	
	$('#desc-container').text('');
	$('#desc-container').text(desc);
	
}

function renderTC(tc){
	$('#tc-container').append(tc);
	
}
   li_class = 'tree-li';
   ul_class = 'tree-ul'

    function genTree(domNode){
      var parentObj = []
      
      $(domNode).find('> li, > ul > li').each(function(){
        var childrenMap = []

        if($(this).find('ul').size() > 0){
          $(this).find('ul > li').each(function(){
            temchildrenMap = {
              name: $(this).attr('name')
            }

            childrenMap.push(temchildrenMap)

          })
     
        }

        temMap = {
          name: $(this).attr('name'),
          children: childrenMap
        }
        parentObj.push(temMap);

      });

      console.log(JSON.stringify(parentObj));
    }

    function setTree(element,json){
      var jsonString = '[{"name":"mod uno","children":[{"name":"TC a mod"},{"name":"TC b mod"}]},{"name":"mod dos","children":[]}]';
      var json = JSON.parse(jsonString)
      $(element).children().remove();
      $(json).each(function(index){
        var node = $('<li/>', {
                          class: li_class,
                          name: this.name,
                          text: this.name
                      })
        if($(this.children).size() > 0){
          var ulchild = $('<ul/>',{
            class: ul_class + " hide"
          })
          $(this.children).each(function(){
            var childNode = $('<li/>', {
                          class: li_class,
                          name: this.name,
                          text: this.name
                        })
            $(ulchild).append(childNode);
          })
          $(node).append(ulchild);
        }
        $(element).append(node)
      })
    }