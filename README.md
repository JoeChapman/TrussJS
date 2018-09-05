<h1>TrussJS</h1> [![Build Status](https://travis-ci.org/JoeChapman/TrussJS.png)](https://travis-ci.org/JoeChapman/TrussJS) [![Greenkeeper badge](https://badges.greenkeeper.io/JoeChapman/TrussJS.svg)](https://greenkeeper.io/)

<p>A JavaScript application framework to promote decoupled event-driven systems and simple composite views.</p>

<h2>Getting started</h2>

<h3>Get it</h3>
<p>TrussJs has no dependencices other than <a href="https://github.com/jrburke/almond">Almond</a>, which is built into the distributed Truss.js and Truss-min.js, so you can drop either one into your project and start using TrussJS immediately.</p>

<h3>Test it</h3>
<p>However, if you want to make changes to the source code, you'll need to run the tests. To do so, install the devDependencies with <code>npm install</code>, which will add grunt and grunt-contrib-jasmine. Use <code>grunt test</code> or just <code>grunt jasmine</code> to run them without jshint.</p>

<p><strong>Please note, TrussJS uses Grunt 0.4.0, which is not supported on versions of Node less than 0.8.</strong></p>

<h2>Using TrussJS</h2>

<h3>Build your constructor</h3>
<p>There are three Function constructors you can build from, each of which lives in the Truss namespace;</p>
<ul>
    <li>Truss.View</li>
    <li>Truss.Collection and,</li>
    <li>Truss.Model</li>
</ul>
<p>Each is extended from Truss.Base and has a prototype chain to the events module.</p>
<p>To build a new constructor from any of these Functions, use the static construct function.</p>

<pre>
<code>var MyConstructor = Truss.View.construct({
    myProperty: 'property',
	myMethod: function () {}
});</code>
</pre>

<p>To instantiate the constructor, simply invoke its create function. There's no <code>new</code> keyword here.</p>
<pre>
<code>var myInstance = MyConstructor.create({myOptions: 'anOption'});</code>
</pre>

<p>Or if you prefer, create a new constructor Function.</p>
<pre>
<code>var AnotherConstructor = MyConstructor.construct({
    anotherMethod: function () {}
});</code>
</pre>

<p>If you pass a 'start' function to construct, it will be invoked when the new constructor is instantiated with create. Any options will be added to the instance and passed as an argument to the 'start' function.</p>

<pre>
<code>AnotherConstructor = MyConstructor.construct({
    start: function () {},
    anotherMethod: function () {}
});</code>
</pre>

<p>The options argument is passed into AnotherConstructor.prototype.start.</p>
<pre>
<code>var anotherInstance = AnotherConstructor.create({myOptions: 'anOption'});</code>
</pre>





