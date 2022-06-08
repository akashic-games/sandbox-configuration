module.exports = () => {
	return {
		test: () => {
			return true;
		},
		hoge: () => {
			return "hoge"
		},
		foo: "foo",
		count: 0,
		inc: function() {
			return ++this.count;
		}
	};
};
