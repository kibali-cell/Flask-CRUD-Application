        document.addEventListener('DOMContentLoaded', function() {
            const forms = document.querySelectorAll('.needs-validation');
            
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    
                    form.classList.add('was-validated');
                }, false);
            });
            
            // For demo purposes only - would be replaced with real data handling
            document.getElementById('addRecordForm').addEventListener('submit', function(e) {
                // e.preventDefault();
                // alert('Record would be saved to database here!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('addRecordModal'));
                modal.hide();
            });
            
            document.getElementById('editRecordForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Record would be updated in database here!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('editRecordModal'));
                modal.hide();
            });
            
            // Simple search functionality
            document.getElementById('searchInput').addEventListener('keyup', function() {
                const searchValue = this.value.toLowerCase();
                const table = document.querySelector('table');
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchValue) ? '' : 'none';
                });
                
                updateRecordCount();
            });
            
            // Simple filter functionality
            document.getElementById('filterSelect').addEventListener('change', function() {
                const filterValue = this.value;
                if (filterValue === 'Filter by...') {
                    resetFilters();
                    return;
                }
                
                const table = document.querySelector('table');
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const category = row.cells[3].textContent;
                    row.style.display = category.includes('Category ' + filterValue) ? '' : 'none';
                });
                
                updateRecordCount();
            });
            
            // Reset filters
            document.getElementById('resetFilters').addEventListener('click', resetFilters);
            
            function resetFilters() {
                document.getElementById('searchInput').value = '';
                document.getElementById('filterSelect').selectedIndex = 0;
                
                const table = document.querySelector('table');
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    row.style.display = '';
                });
                
                updateRecordCount();
            }
            
            function updateRecordCount() {
                const table = document.querySelector('table');
                const visibleRows = Array.from(table.querySelectorAll('tbody tr')).filter(row => row.style.display !== 'none');
                document.getElementById('recordCount').textContent = visibleRows.length + ' Records';
            }
        
                
        });