import jasmine from 'jasmine';
import * as request from "request";

var base_url = "http://localhost:3000/"

describe("Category API test", function() {

    it("All categories code 200", function(done) {
        request.get(base_url+'category/all', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });


    it("Add category OK", function(done) {
        let cat: any = {'name': 'Test category', 'name_slug': 'test-category' }
        request.post({
          url: base_url+'category/create',
          body: cat,
          json: true
        }, function(error, response, body) {
        expect(body).toEqual({status: 0, message: 'Ok'});
        done();
      });
    });    
  

});