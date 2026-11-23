// Reads the words in each image with macOS's built-in text recognition
// (the Vision framework, the same thing that powers Live Text).
//   align-ocr a.jpg b.jpg …   →   one line of JSON per image: {"file": "...", "lines": ["...", ...]}
// Lines come out top to bottom, then left to right. Built once by src/process.mjs.
import Foundation
import ImageIO
import Vision

func recognize(_ path: String) -> [String] {
    let url = URL(fileURLWithPath: path) as CFURL
    guard let source = CGImageSourceCreateWithURL(url, nil),
          let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else { return [] }
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    let handler = VNImageRequestHandler(cgImage: image, options: [:])
    do { try handler.perform([request]) } catch { return [] }
    let observations = (request.results as? [VNRecognizedTextObservation]) ?? []
    // Vision's origin is the bottom-left corner, so a higher y is nearer the top.
    let ordered = observations.sorted { a, b in
        let ay = a.boundingBox.midY, by = b.boundingBox.midY
        if abs(ay - by) > 0.02 { return ay > by }
        return a.boundingBox.minX < b.boundingBox.minX
    }
    return ordered.compactMap { obs -> String? in
        guard let best = obs.topCandidates(1).first, best.confidence >= 0.3 else { return nil }
        return best.string
    }
}

for path in CommandLine.arguments.dropFirst() {
    let object: [String: Any] = ["file": path, "lines": recognize(path)]
    if let data = try? JSONSerialization.data(withJSONObject: object),
       let line = String(data: data, encoding: .utf8) {
        print(line)
    }
}
