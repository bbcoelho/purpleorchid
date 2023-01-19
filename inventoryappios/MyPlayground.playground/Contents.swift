import UIKit

func getData() async throws {
    
    let url = URL(string: "http://localhost:3000/inventory/")!
    
    var request = URLRequest(url: url)
    request.httpMethod = "GET"
    
    let (data, response) = try await URLSession.shared.data(for: request)
    
    print(data)
    print(response)
}

do {
    try await getData()
} catch {
    print(error)
}
