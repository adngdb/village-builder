<script>
    export let resources;
</script>

<style>
    ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>

<ul>
    { #each Object.entries(resources) as res }
    <li>{ res[1] } { res[0] }</li>
    { /each }
</ul>
