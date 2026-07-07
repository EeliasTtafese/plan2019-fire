        document.addEventListener('DOMContentLoaded', () => {
            const inputs = document.querySelectorAll('.progress-input');
            
            function calculateTotals() {
                let grandTotal = 0;
                
                inputs.forEach(input => {
                    let val = parseInt(input.value);
                    
                    // Validate bound thresholds (0 - 100)
                    if (isNaN(val) || val < 0) val = 0;
                    if (val > 100) val = 100;
                    input.value = val;

                    // Update independent roadmap bar
                    const barId = `${input.id}Bar`;
                    document.getElementById(barId).style.width = `${val}%`;
                    
                    grandTotal += val;
                });

                // Calculate cumulative average progress
                const macroAverage = Math.round(grandTotal / inputs.length);
                
                // Update interface
                document.getElementById('macroBar').style.width = `${macroAverage}%`;
                document.getElementById('macroPercent').textContent = `${macroAverage}%`;
            }

            // Bind real-time input event listeners to all fields
            inputs.forEach(input => {
                input.addEventListener('input', calculateTotals);
            });

            // Initial render computation pass
            calculateTotals();
        });