using Microsoft.AspNetCore.Mvc;
using PatientManagement.API.Models;
using PatientManagement.API.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace PatientManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]


    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository _repository;

        public PatientsController(IPatientRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _repository.GetAllAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _repository.GetByIdAsync(id);
            if (patient == null)
                return NotFound();

            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Patient patient)
        {
            var created = await _repository.AddAsync(patient);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Patient patient)
        {
            if (id != patient.Id)
                return BadRequest();

            await _repository.UpdateAsync(patient);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}