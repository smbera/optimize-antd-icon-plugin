const pluginName = require('./package.json').name
let pluginOptions = {}
const validate = require("schema-utils")

function AntdIconReducePlugin(options) {
	pluginOptions = options

	validate({
		type: "object",
		properties: {
			filePath: {
				type: "string"
			}
		},
		required: ["filePath"],
		additionalProperties: false
	  }, options, pluginName)
}

function setIconAlisa(compiler) {
	const filePath = pluginOptions.filePath
    if (!compiler.options.resolve) {
        compiler.options.resolve = {
            alias: {
                '@ant-design/icons/lib/dist$': filePath,
            }
        }
    } else if (!compiler.options.resolve.alias) {
        compiler.options.resolve.alias = {
            '@ant-design/icons/lib/dist$': filePath,
        }
    } else {
        compiler.options.resolve.alias['@ant-design/icons/lib/dist$'] = filePath
    }
}

AntdIconReducePlugin.prototype.apply = function(compiler) {
    setIconAlisa(compiler)
}

module.exports = AntdIconReducePlugin