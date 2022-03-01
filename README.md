# Item List
This script is provided access to item list by template.
## How it Works?
This code particle have a default template. The template is merging to parameter template when access this instance.

'requestUrl' parameters is necessary. Sending HttpGet request for template values and bonded to response data.

## How call instance?
```html
<!doctype html>
<html lang="en">
  <body>
    <div id="example">
    </div>
    <script type="text/javascript">
      document.addEventListener('DOMContentLoaded', (event) => {
      ItemListInstance.instance.init({
        container:'#example',
        requestUrl:'http://localhost:8080/widgets'
      });
    });
  </script>
  </body>
</html>
```
