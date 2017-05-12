var expect = require("chai").expect;

var spellchecker = require("../spellchecker");

describe("Spellchecker", function() {
  describe("hasUpperCase", function() {
    it("returns boolean based on if string has uppercase", function() {
      var hasUpperCase = spellchecker.hasUpperCase('rAbbit'),
          doesntHaveUpperCase = spellchecker.hasUpperCase('rabbit');

      expect(hasUpperCase).to.equal(true);
      expect(doesntHaveUpperCase).to.equal(false);
    });
  });

  describe("hasRepeatedChars", function() {
    it("returns boolean based on if string has more than 2 consecutive repeated chars", function() {
      var hasRepeatedChars = spellchecker.hasRepeatedChars('rabbbit'),
          doesntRepeatedChars = spellchecker.hasRepeatedChars('rabbit');

      expect(hasRepeatedChars).to.equal(true);
      expect(doesntRepeatedChars).to.equal(false);
    });
  });

  describe("trimRepeatedChars", function() {
    it("returns string with 3 or repeated chars reduced to 1", function() {
      var spaghetti = "spaghetti";

      var modified = spellchecker.trimRepeatedChars('spaghetttti'),
          unmodified = spellchecker.trimRepeatedChars(spaghetti);

      expect(modified).to.equal(spaghetti);
      expect(unmodified).to.equal(spaghetti);
    });
  });
});
