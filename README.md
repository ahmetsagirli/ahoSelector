# ahoSelector

jQuery select custom modulue.

demo: [https://ahmetsagirli.com.tr/ahoSelector/](https://ahmetsagirli.com.tr/ahoSelector/)
    
    <link rel="stylesheet" href="css/ahoSelector.css" />

    <div class="container mt-5">
        <div class="form-group">
            <label>Fruits</label>
            <select name="fruits" id="fruits">
                <option selected disabled>- Choose -</option>
                <option value="1">Apple</option>
                <option value="2">Orange</option>
                <option value="3">Watermelon</option>
            </select>
        </div>
        <div class="form-group">
            <label>Branchs</label>
            <select name="branchs" id="branchs">
                <option selected disabled>- Choose -</option>
                <option value="apple">Apple</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="oppo">Oppo</option>
            </select>
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script src="js/ahoSelector.js"></script>

    <script>
	    $(document).ready(function(){
            ahoSelector.run();
        });

        // select checked value; (dom, value)
        ahoSelector.selected('#fruits', 1);
        ahoSelector.selected('#branchs', 'oppo');

        // refresh select; (dom)
        ahoSelector.refresh('#fruits');
	</script>