<h1>TrussJS</h1> [![Build Status](https://travis-ci.org/JoeChapman/TrussJS.png)](https://travis-ci.org/JoeChapman/TrussJS)

<p>A JavaScript application framework to promote decoupled event-driven systems and simple composite views. We're still in the development process, but please feel free to play around and give us your feedback.</p>

<h2>Currently on the roadmap</h2>

<ol>
	<li><del>Mediator</del></li>
	<li>Controller</li>
	<li>Cross-browser Utils</li>
	<li>Support for offline</li>
</ol>

<h2>Getting started</h2>

<h3>Get it</h3>
<p>If you want to play around, fork Truss and clone the new repo to your machine. When finished, cd into the Truss root directory and run <code>npm install</code> to install the dependencies, if it gives you the ok, you're ready to start coding.</p>

<h3>Test it</h3>
<p>Run the tests and jshint with <code>grunt test</code> or just <code>grunt jasmine</code> to run them without jshint.</p>

<h3>Build it</h3>
<p>Run <code>grunt requirejs</code> to minify and concat all scripts, that'll output Truss.0.1.0-min.js to the root, which you can then point to in a script tag from your project. Alternatively, link to each script you want to use in the src directory. However, please bear in mind that Truss.EventEmitter.js, Truss.Utils.js and Truss.js are currently hard dependencies, in that order.</p>

<h2>Developing</h2>
<p>I think the best way to start is with an example, so...</p>

<h3>Inheritance</h3>
<p>Use the construct function to create a new constructor function and prototype that inherits from its parent</p>
<pre>
<code>var func = Truss.construct({
	protoMethod: function () {}
});</code>
</pre>
<p><code>func</code> also has a construct function</p>
<pre>
<code>var cool = func.construct({
	anotherProtoMethod: function () {}
});</code>
</pre>
<p> and <code>cool</code> has a link to the prototype of <code>func</code></p>
<pre>
<code>typeof cool.prototype.protoMethod === 'function' // true</code>
</pre>







