<script>
    import resources from './stores/resources';
</script>

<style>
    ul {
        list-style: none;
    }
    li {
        display: inline;
        margin: 1vw;
    }
</style>

<ul>
    { #each resources.RESOURCES as res }
    <li>{ res.name }: { $resources[res.key] }</li>
    { /each }
</ul>
